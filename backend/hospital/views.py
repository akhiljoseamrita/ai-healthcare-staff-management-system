import json
import os
from datetime import datetime
from urllib import error as urlerror
from urllib import request as urlrequest

from django.db import IntegrityError, transaction
from django.db.models import Count, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from hospital.models import Department, Hospital, JobApplication, JobPosting, ShiftAssignment
from staff.models import AppUser, Profession, StaffProfile
from staff.services.recommendation_ai import (
    enhance_recommendations_with_ai,
    ensure_unique_reason_messages,
    synthesize_short_reason_from_tags,
)

DEFAULT_PROFESSIONS = [
    "Physician",
    "Registered Nurse",
    "Physician Assistant",
    "Nurse Practitioner",
    "Surgeon",
]
DEFAULT_DEPARTMENTS = [
    "ICU",
    "Emergency",
    "Radiology",
    "Pediatrics",
    "Surgery",
]


def _env_enabled(value):
    return str(value).strip().lower() in {"1", "true", "yes", "on"}


def _json_error(message, status=400):
    return JsonResponse({"error": message}, status=status)


def _parse_json_body(request):
    try:
        return json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return None


def _signup_supabase_user(email, password):
    supabase_url = os.getenv("SUPABASE_URL")
    service_role_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not service_role_key:
        raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.")

    endpoint = f"{supabase_url.rstrip('/')}/auth/v1/admin/users"
    payload = json.dumps(
        {"email": email, "password": password, "email_confirm": True}
    ).encode("utf-8")

    request_obj = urlrequest.Request(
        endpoint,
        data=payload,
        headers={
            "apikey": service_role_key,
            "Authorization": f"Bearer {service_role_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urlrequest.urlopen(request_obj, timeout=20) as response:
            response_body = response.read().decode("utf-8")
    except urlerror.HTTPError as exc:
        try:
            details = json.loads(exc.read().decode("utf-8"))
        except (ValueError, json.JSONDecodeError):
            details = {"message": "Supabase signup failed."}
        message = details.get("msg") or details.get("message") or "Supabase signup failed."
        if exc.code in (400, 409, 422):
            raise ValueError(message) from exc
        raise RuntimeError(message) from exc
    except urlerror.URLError as exc:
        raise RuntimeError(f"Supabase signup connection error: {exc.reason}") from exc

    data = json.loads(response_body)
    user_id = data.get("id")
    if not user_id:
        raise RuntimeError("Supabase signup returned no user id.")
    return user_id


def _login_supabase_user(email, password):
    supabase_url = os.getenv("SUPABASE_URL")
    anon_key = os.getenv("SUPABASE_ANON_KEY") or os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    if not supabase_url or not anon_key:
        raise ValueError(
            "SUPABASE_URL and SUPABASE_ANON_KEY must be configured "
            "(or fallback SUPABASE_SERVICE_ROLE_KEY)."
        )

    endpoint = f"{supabase_url.rstrip('/')}/auth/v1/token?grant_type=password"
    payload = json.dumps({"email": email, "password": password}).encode("utf-8")
    request_obj = urlrequest.Request(
        endpoint,
        data=payload,
        headers={
            "apikey": anon_key,
            "Authorization": f"Bearer {anon_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urlrequest.urlopen(request_obj, timeout=20) as response:
            response_body = response.read().decode("utf-8")
    except urlerror.HTTPError as exc:
        try:
            details = json.loads(exc.read().decode("utf-8"))
        except (ValueError, json.JSONDecodeError):
            details = {"message": "Supabase login failed."}
        message = details.get("msg") or details.get("message") or "Supabase login failed."
        if exc.code in (400, 401, 422):
            raise ValueError(message) from exc
        raise RuntimeError(message) from exc
    except urlerror.URLError as exc:
        raise RuntimeError(f"Supabase login connection error: {exc.reason}") from exc

    data = json.loads(response_body)
    if not data.get("access_token") or not data.get("user", {}).get("id"):
        raise RuntimeError("Supabase login returned incomplete session payload.")
    return data


def _format_relative_time(dt):
    delta = timezone.now() - dt
    seconds = int(delta.total_seconds())

    if seconds < 60:
        return "Just now"
    minutes = seconds // 60
    if minutes < 60:
        return f"{minutes}m ago"
    hours = minutes // 60
    if hours < 24:
        return f"{hours}h ago"
    days = hours // 24
    if days == 1:
        return "Yesterday"
    return f"{days}d ago"


def _format_datetime_window(start_dt, end_dt):
    return f"{start_dt.strftime('%I:%M %p')} - {end_dt.strftime('%I:%M %p')}"


def _ensure_default_professions():
    for name in DEFAULT_PROFESSIONS:
        if not Profession.objects.filter(name__iexact=name).exists():
            Profession.objects.create(name=name)


def _ensure_default_departments(hospital):
    for name in DEFAULT_DEPARTMENTS:
        if not Department.objects.filter(hospital=hospital, name__iexact=name).exists():
            Department.objects.create(hospital=hospital, name=name)


@require_GET
def meta_options(request):
    hospital_id = request.GET.get("hospital_id")
    if not hospital_id:
        return _json_error("hospital_id query param is required")

    hospital = get_object_or_404(Hospital, id=hospital_id)
    _ensure_default_professions()
    _ensure_default_departments(hospital)
    departments = (
        Department.objects.filter(hospital=hospital).order_by("name").values("id", "name")
    )
    professions = Profession.objects.order_by("name").values("id", "name")

    return JsonResponse(
        {
            "hospital": {"id": hospital.id, "name": hospital.name},
            "departments": list(departments),
            "professions": list(professions),
        }
    )


@require_GET
def shift_summary_list(request):
    hospital_id = request.GET.get("hospital_id")
    if not hospital_id:
        return _json_error("hospital_id query param is required")

    jobs = (
        JobPosting.objects.filter(hospital_id=hospital_id)
        .select_related("profession", "department")
        .annotate(applicant_count=Count("applications", distinct=True))
        .order_by("-created_at")[:20]
    )

    items = []
    for job in jobs:
        assigned_qs = (
            job.assignments.filter(status=ShiftAssignment.Status.ASSIGNED)
            .select_related("staff__user", "staff__profession")
            .order_by("-assigned_at")
        )
        applicants_qs = (
            job.applications.filter(
                status__in=[JobApplication.Status.APPLIED, JobApplication.Status.SHORTLISTED]
            )
            .select_related("staff__user")
            .order_by("-applied_at")
        )

        items.append(
            {
                "id": job.id,
                "title": f"{job.profession.name} - {job.department.name}",
                "time": _format_relative_time(job.created_at),
                "capacity": job.required_staff_count,
                "status": job.status,
                "assigned_count": assigned_qs.count(),
                "applicant_count": applicants_qs.count(),
                "assigned": [
                    {
                        "id": assignment.staff_id,
                        "name": assignment.staff.user.full_name,
                        "role": assignment.staff.profession.name,
                        "avatar": assignment.staff.avatar_url,
                        "status": assignment.status,
                        "time": assignment.assigned_at.strftime("%I:%M %p"),
                    }
                    for assignment in assigned_qs
                ],
                "applicants": [
                    {
                        "id": app.staff_id,
                        "application_id": app.id,
                        "name": app.staff.user.full_name,
                        "rating": float(app.staff.rating_avg),
                        "shifts": app.staff.total_completed_shifts,
                        "avatar": app.staff.avatar_url,
                        "status": app.status,
                    }
                    for app in applicants_qs
                ],
            }
        )

    return JsonResponse({"results": items})


@require_GET
def shift_management_detail(request, job_id):
    job = get_object_or_404(
        JobPosting.objects.select_related("hospital", "department", "profession"), id=job_id
    )

    assigned = (
        job.assignments.filter(status=ShiftAssignment.Status.ASSIGNED)
        .select_related("staff__user", "staff__profession")
        .order_by("-assigned_at")
    )
    applicants = (
        job.applications.filter(
            status__in=[JobApplication.Status.APPLIED, JobApplication.Status.SHORTLISTED]
        )
        .select_related("staff__user")
        .order_by("-applied_at")
    )

    payload = {
        "job": {
            "id": job.id,
            "title": f"{job.profession.name} - {job.department.name}",
            "description": job.description,
            "required_staff_count": job.required_staff_count,
            "status": job.status,
            "shift_window": _format_datetime_window(job.shift_start, job.shift_end),
            "shift_start": job.shift_start.isoformat(),
            "shift_end": job.shift_end.isoformat(),
            "department": job.department.name,
            "profession": job.profession.name,
            "hourly_rate": str(job.hourly_rate),
            "currency": job.currency,
        },
        "assigned": [
            {
                "id": assignment.id,
                "staff_id": assignment.staff_id,
                "name": assignment.staff.user.full_name,
                "role": assignment.staff.profession.name,
                "avatar": assignment.staff.avatar_url,
                "status": assignment.status,
                "assigned_at": assignment.assigned_at.isoformat(),
            }
            for assignment in assigned
        ],
        "applicants": [
            {
                "application_id": app.id,
                "staff_id": app.staff_id,
                "name": app.staff.user.full_name,
                "rating": float(app.staff.rating_avg),
                "shifts": app.staff.total_completed_shifts,
                "avatar": app.staff.avatar_url,
                "status": app.status,
                "applied_at": app.applied_at.isoformat(),
            }
            for app in applicants
        ],
    }

    return JsonResponse(payload)


@csrf_exempt
@require_POST
def create_job_posting(request):
    body = _parse_json_body(request)
    if body is None:
        return _json_error("Invalid JSON body")

    required_fields = [
        "hospital_id",
        "department_id",
        "profession_id",
        "required_staff_count",
        "shift_start",
        "shift_end",
        "hourly_rate",
    ]
    missing = [field for field in required_fields if field not in body]
    if missing:
        return _json_error(f"Missing fields: {', '.join(missing)}")

    try:
        shift_start = datetime.fromisoformat(body["shift_start"])
        shift_end = datetime.fromisoformat(body["shift_end"])
    except (TypeError, ValueError):
        return _json_error("shift_start and shift_end must be ISO datetime strings")

    job = JobPosting(
        hospital_id=body["hospital_id"],
        department_id=body["department_id"],
        profession_id=body["profession_id"],
        required_staff_count=body["required_staff_count"],
        shift_start=shift_start,
        shift_end=shift_end,
        hourly_rate=body["hourly_rate"],
        currency=body.get("currency", "USD"),
        timezone=body.get("timezone", "UTC"),
        shift_type=body.get("shift_type", JobPosting.ShiftType.DAY),
        description=body.get("description", ""),
        city=body.get("city", ""),
        state=body.get("state", ""),
        country=body.get("country", ""),
    )

    try:
        job.save()
    except Exception as exc:
        return _json_error(str(exc))

    return JsonResponse({"id": job.id, "message": "Job posting created"}, status=201)


@csrf_exempt
@require_POST
def update_application_status(request, application_id):
    body = _parse_json_body(request)
    if body is None:
        return _json_error("Invalid JSON body")

    status_value = body.get("status")
    allowed = {
        JobApplication.Status.SHORTLISTED,
        JobApplication.Status.ACCEPTED,
        JobApplication.Status.REJECTED,
        JobApplication.Status.WITHDRAWN,
    }
    if status_value not in allowed:
        return _json_error("Invalid status value")

    application = get_object_or_404(JobApplication, id=application_id)
    application.status = status_value
    application.decision_at = timezone.now()
    application.note = body.get("note", application.note)
    application.save(update_fields=["status", "decision_at", "note", "updated_at"])

    return JsonResponse({"message": "Application status updated", "status": application.status})


@csrf_exempt
@require_POST
def create_shift_assignment(request, job_id):
    body = _parse_json_body(request)
    if body is None:
        return _json_error("Invalid JSON body")

    staff_id = body.get("staff_id")
    assigned_by_user_id = body.get("assigned_by_user_id")
    if not staff_id:
        return _json_error("staff_id is required")

    job = get_object_or_404(JobPosting, id=job_id)
    application, _ = JobApplication.objects.get_or_create(
        job=job,
        staff_id=staff_id,
        defaults={"status": JobApplication.Status.SHORTLISTED},
    )

    # Invitation flow: keep shift pending until the application is accepted.
    if application.status != JobApplication.Status.ACCEPTED:
        if application.status != JobApplication.Status.SHORTLISTED:
            application.status = JobApplication.Status.SHORTLISTED
            application.decision_at = timezone.now()
            application.save(update_fields=["status", "decision_at", "updated_at"])

        return JsonResponse(
            {
                "message": "Staff invitation sent",
                "application_id": application.id,
                "application_status": application.status,
            },
            status=201,
        )

    existing_assignment = ShiftAssignment.objects.filter(job=job, staff_id=staff_id).first()
    if existing_assignment:
        return JsonResponse(
            {
                "id": existing_assignment.id,
                "message": "Staff already assigned",
            }
        )

    assignment = ShiftAssignment(
        job=job,
        staff_id=staff_id,
        assigned_by_user_id=assigned_by_user_id,
        shift_start_snapshot=job.shift_start,
        shift_end_snapshot=job.shift_end,
    )

    try:
        assignment.save()
    except Exception as exc:
        return _json_error(str(exc))

    return JsonResponse({"id": assignment.id, "message": "Staff assigned"}, status=201)


@csrf_exempt
@require_POST
def register_hospital(request):
    body = _parse_json_body(request)
    if body is None:
        return _json_error("Invalid JSON body")

    hospital_name = str(body.get("hospital_name", "")).strip()
    email = str(body.get("email", "")).strip().lower()
    password = str(body.get("password", ""))
    confirm_password = str(body.get("confirm_password", ""))
    phone = str(body.get("phone", "")).strip()
    location = str(body.get("location", "")).strip()

    if not hospital_name:
        return _json_error("hospital_name is required")
    if not email:
        return _json_error("email is required")
    if not password or len(password) < 8:
        return _json_error("password must be at least 8 characters")
    if password != confirm_password:
        return _json_error("password and confirm_password do not match")

    if AppUser.objects.filter(email=email).exists():
        return _json_error("Email is already registered", status=409)

    try:
        supabase_user_id = _signup_supabase_user(email=email, password=password)
    except ValueError as exc:
        return _json_error(str(exc), status=409)
    except RuntimeError as exc:
        return _json_error(str(exc), status=502)

    try:
        with transaction.atomic():
            owner = AppUser.objects.create(
                id=supabase_user_id,
                full_name=hospital_name,
                email=email,
                role=AppUser.Role.HOSPITAL,
                is_active=True,
            )
            hospital = Hospital.objects.create(
                owner_user=owner,
                name=hospital_name,
                address=location,
                phone=phone,
            )
    except IntegrityError as exc:
        return _json_error(f"Could not create hospital profile: {exc}", status=409)

    return JsonResponse(
        {
            "message": "Hospital registration successful",
            "hospital_id": hospital.id,
            "user_id": str(owner.id),
            "email": owner.email,
            "hospital_name": hospital.name,
        },
        status=201,
    )


@csrf_exempt
@require_POST
def login_hospital(request):
    body = _parse_json_body(request)
    if body is None:
        return _json_error("Invalid JSON body")

    email = str(body.get("email", "")).strip().lower()
    password = str(body.get("password", ""))
    if not email or not password:
        return _json_error("email and password are required")

    try:
        session = _login_supabase_user(email=email, password=password)
    except ValueError as exc:
        return _json_error(str(exc), status=401)
    except RuntimeError as exc:
        return _json_error(str(exc), status=502)

    user_id = session["user"]["id"]
    owner = AppUser.objects.filter(id=user_id, role=AppUser.Role.HOSPITAL, is_active=True).first()
    if not owner:
        return _json_error("Hospital profile not found for this account", status=404)

    hospital = Hospital.objects.filter(owner_user=owner).order_by("id").first()
    if not hospital:
        return _json_error("Hospital profile not found for this account", status=404)

    return JsonResponse(
        {
            "message": "Login successful",
            "hospital_id": hospital.id,
            "user_id": str(owner.id),
            "email": owner.email,
            "hospital_name": hospital.name,
            "access_token": session.get("access_token"),
            "refresh_token": session.get("refresh_token"),
            "expires_in": session.get("expires_in"),
            "token_type": session.get("token_type"),
        }
    )


@require_GET
def staff_recommendations_for_job(request):
    job_id = request.GET.get("job_id")
    hospital_id = request.GET.get("hospital_id")
    department_filter = request.GET.get("department")
    try:
        limit = int(request.GET.get("limit", 6))
    except (TypeError, ValueError):
        return _json_error("limit must be an integer")
    if limit <= 0:
        return _json_error("limit must be greater than 0")

    candidate_qs = (
        StaffProfile.objects.select_related("user", "profession")
        .prefetch_related("staff_skills__skill", "availability_slots")
        .filter(status=StaffProfile.Status.ACTIVE, user__is_active=True)
    )

    def score_for_job(job):
        required_skills = list(job.required_skills.select_related("skill"))
        shift_day = job.shift_start.weekday()
        shift_start = job.shift_start.time()
        shift_end = job.shift_end.time()

        history_by_staff = {
            row["staff_id"]: row["count"]
            for row in (
                ShiftAssignment.objects.filter(job__hospital=job.hospital)
                .values("staff_id")
                .annotate(count=Count("id"))
            )
        }
        total_history_max = max(history_by_staff.values(), default=1)

        scored = []
        for staff in candidate_qs:
            profession_fit = 100 if staff.profession_id == job.profession_id else 25

            skill_map = {entry.skill_id: entry.proficiency for entry in staff.staff_skills.all()}
            if required_skills:
                matched = 0
                for req in required_skills:
                    proficiency = skill_map.get(req.skill_id, 0)
                    matched += min(proficiency / max(req.minimum_proficiency, 1), 1.0)
                skill_match = round((matched / len(required_skills)) * 100)
            else:
                # Fallback for MVP jobs that only specify profession.
                skill_match = profession_fit

            available_windows = [
                (slot.start_time, slot.end_time)
                for slot in staff.availability_slots.all()
                if slot.is_active and slot.day_of_week == shift_day
            ]
            availability_fit = 30
            for start_time, end_time in available_windows:
                if start_time <= shift_start and end_time >= shift_end:
                    availability_fit = 100
                    break

            history_fit = round((history_by_staff.get(staff.id, 0) / total_history_max) * 100)
            reliability_fit = round(min((float(staff.rating_avg) / 5.0) * 100, 100))

            match_score = round(
                (skill_match * 0.40)
                + (availability_fit * 0.25)
                + (history_fit * 0.20)
                + (reliability_fit * 0.15)
            )

            scored.append(
                {
                    "staff_id": staff.id,
                    "name": staff.user.full_name,
                    "role": staff.profession.name,
                    "avatar": staff.avatar_url,
                    "rating": float(staff.rating_avg),
                    "completed_shifts": staff.total_completed_shifts,
                    "match": match_score,
                    "tags": [
                        {"key": "skill_match", "value": skill_match},
                        {"key": "availability_fit", "value": availability_fit},
                        {"key": "past_shift_history", "value": history_fit},
                        {"key": "staff_reliability", "value": reliability_fit},
                    ],
                }
            )

        scored.sort(key=lambda item: item["match"], reverse=True)
        top_results = scored[:limit]

        ai_context = {
            "hospital_id": job.hospital_id,
            "job_id": job.id,
            "department": job.department.name,
            "profession": job.profession.name,
            "shift_start": job.shift_start.isoformat(),
            "shift_end": job.shift_end.isoformat(),
            "limit": limit,
        }
        ai_ready_candidates = [
            {
                "id": item["staff_id"],
                "name": item["name"],
                "role": item["role"],
                "match": item["match"],
                "rating": item.get("rating"),
                "completed_shifts": item.get("completed_shifts"),
                "tags": item.get("tags", []),
            }
            for item in top_results
        ]
        # Deterministic score remains explainable source-of-truth; AI adds contextual reranking.
        ai_ranked, ai_meta = enhance_recommendations_with_ai(
            mode="hospital_to_staff",
            candidates=ai_ready_candidates,
            context=ai_context,
        )
        final_by_id = {item["id"]: item for item in ai_ranked}

        final_results = []
        for item in top_results:
            merged_item = dict(item)
            ai_item = final_by_id.get(item["staff_id"], {})
            if ai_item:
                merged_item["ai_score"] = ai_item.get("ai_score")
                merged_item["ai_reason_short"] = ai_item.get(
                    "ai_reason_short"
                ) or synthesize_short_reason_from_tags(merged_item.get("tags", []))
                merged_item["ai_reason_details"] = ai_item.get("ai_reason_details", [])
                merged_item["ai_confidence"] = ai_item.get("ai_confidence")
            else:
                merged_item["ai_score"] = merged_item.get("match", 0)
                merged_item["ai_reason_short"] = synthesize_short_reason_from_tags(
                    merged_item.get("tags", [])
                )
                merged_item["ai_reason_details"] = []
                merged_item["ai_confidence"] = "LOW"
            final_results.append(merged_item)

        if ai_meta.get("applied"):
            final_results.sort(
                key=lambda row: (
                    -(row.get("ai_score") or row.get("match") or 0),
                    -(row.get("match") or 0),
                )
            )
        ensure_unique_reason_messages(final_results)

        return final_results, ai_meta

    if job_id:
        job = get_object_or_404(
            JobPosting.objects.select_related("hospital", "profession", "department"),
            id=job_id,
        )
        results, ai_meta = score_for_job(job)
        return JsonResponse(
            {
                "job_id": job.id,
                "results": results,
                "ai_meta": ai_meta,
                "recommendation_engine": "hybrid_ai" if ai_meta.get("applied") else "deterministic",
            }
        )

    if not hospital_id:
        return _json_error("job_id or hospital_id query param is required")

    hospital = get_object_or_404(Hospital, id=hospital_id)
    departments_qs = Department.objects.filter(hospital=hospital).order_by("name")
    if department_filter and department_filter != "All":
        departments_qs = departments_qs.filter(name__iexact=department_filter)
    departments = list(departments_qs)

    jobs_qs = (
        JobPosting.objects.filter(
            hospital=hospital,
            status=JobPosting.Status.OPEN,
        )
        .select_related("hospital", "profession", "department")
        .order_by("department_id", "-created_at")
    )

    latest_job_by_department = {}
    for job in jobs_qs:
        if job.department_id not in latest_job_by_department:
            latest_job_by_department[job.department_id] = job

    grouped_results = []
    ai_applied_any = False
    ai_fallback_reasons = []
    for department in departments:
        job = latest_job_by_department.get(department.id)
        if not job:
            grouped_results.append(
                {
                    "department": department.name,
                    "job_id": None,
                    "results": [],
                    "ai_meta": {
                        "enabled": False,
                        "provider": "firebase_gemini",
                        "model": None,
                        "applied": False,
                        "fallback_reason": "no_open_job",
                    },
                }
            )
            continue

        results, ai_meta = score_for_job(job)
        ai_applied_any = ai_applied_any or bool(ai_meta.get("applied"))
        if ai_meta.get("fallback_reason"):
            ai_fallback_reasons.append(ai_meta.get("fallback_reason"))
        grouped_results.append(
            {
                "department": department.name,
                "job_id": job.id,
                "results": results,
                "ai_meta": ai_meta,
            }
        )

    return JsonResponse(
        {
            "hospital_id": hospital_id,
            "results": grouped_results,
            "ai_meta": {
                "enabled": _env_enabled(os.getenv("AI_RECOMMENDATIONS_ENABLED", "false")),
                "provider": os.getenv("AI_PROVIDER", "firebase_gemini"),
                "model": os.getenv("AI_MODEL", "gemini-2.5-flash"),
                "applied": ai_applied_any,
                "fallback_reason": ",".join(ai_fallback_reasons[:3]) if ai_fallback_reasons else None,
            },
            "recommendation_engine": "hybrid_ai" if ai_applied_any else "deterministic",
        }
    )


@require_GET
def search_directory(request):
    hospital_id = request.GET.get("hospital_id")
    if not hospital_id:
        return _json_error("hospital_id query param is required")

    query = str(request.GET.get("q", "")).strip()
    hospital = get_object_or_404(Hospital, id=hospital_id)

    departments_qs = Department.objects.filter(hospital=hospital)
    if query:
        departments_qs = departments_qs.filter(name__icontains=query)
    departments = list(
        departments_qs.order_by("name").values("id", "name")
    )

    staff_qs = (
        StaffProfile.objects.select_related("user", "profession")
        .filter(status=StaffProfile.Status.ACTIVE, user__is_active=True)
        .filter(
            Q(
                hospital_affiliations__hospital=hospital,
                hospital_affiliations__status="APPROVED",
            )
            | Q(job_applications__job__hospital=hospital)
            | Q(shift_assignments__job__hospital=hospital)
        )
        .distinct()
    )
    if query:
        staff_qs = staff_qs.filter(user__full_name__icontains=query)

    staff_profiles = [
        {
            "id": row["id"],
            "full_name": row["user__full_name"],
            "profession": row["profession__name"],
            "rating_avg": float(row["rating_avg"]),
            "total_completed_shifts": row["total_completed_shifts"],
        }
        for row in staff_qs.order_by("user__full_name").values(
            "id",
            "user__full_name",
            "profession__name",
            "rating_avg",
            "total_completed_shifts",
        )
    ]

    return JsonResponse(
        {
            "hospital": {"id": hospital.id, "name": hospital.name},
            "query": query,
            "counts": {
                "departments": len(departments),
                "staff_profiles": len(staff_profiles),
            },
            "departments": departments,
            "staff_profiles": staff_profiles,
        }
    )
