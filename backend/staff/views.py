import json
import os
from collections import defaultdict
from datetime import time, timedelta
from urllib import error as urlerror
from urllib import request as urlrequest

from django.db import IntegrityError, transaction
from django.db.models import Avg, Count, Q
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from hospital.models import Department, Hospital, HospitalReview, JobApplication, JobPosting, ShiftAssignment
from staff.models import AppUser, AvailabilitySlot, Profession, StaffProfile
from staff.services.recommendation_ai import (
    enhance_recommendations_with_ai,
    ensure_unique_reason_messages,
    synthesize_short_reason_from_tags,
)


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
        {
            "email": email,
            "password": password,
            # Admin endpoint can create confirmed users for MVP admin onboarding.
            "email_confirm": True,
        }
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


@require_GET
def dashboard_summary(request):
    staff_id = request.GET.get("staff_id")
    if not staff_id:
        return _json_error("staff_id query param is required")

    staff = get_object_or_404(StaffProfile.objects.select_related("user"), id=staff_id)

    pending_count = staff.job_applications.filter(
        status__in=[JobApplication.Status.APPLIED, JobApplication.Status.SHORTLISTED]
    ).count()
    accepted_count = staff.job_applications.filter(status=JobApplication.Status.ACCEPTED).count()
    completed_count = staff.shift_assignments.filter(status=ShiftAssignment.Status.COMPLETED).count()

    week_start = timezone.localdate() - timedelta(days=timezone.localdate().weekday())
    week_end = week_start + timedelta(days=7)
    week_assignments = staff.shift_assignments.filter(
        status__in=[ShiftAssignment.Status.ASSIGNED, ShiftAssignment.Status.COMPLETED],
        shift_start_snapshot__date__gte=week_start,
        shift_start_snapshot__date__lt=week_end,
    )

    daily_hours = {day: 0 for day in ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
    for item in week_assignments:
        day_key = item.shift_start_snapshot.strftime("%a")
        duration_hours = (item.shift_end_snapshot - item.shift_start_snapshot).total_seconds() / 3600
        if day_key in daily_hours:
            daily_hours[day_key] += round(duration_hours, 1)

    recent_activity = (
        staff.job_applications.select_related("job__hospital", "job__department")
        .order_by("-updated_at")[:10]
    )

    return JsonResponse(
        {
            "greeting_name": staff.user.full_name,
            "pending_applications": pending_count,
            "accepted_shifts": accepted_count,
            "completed_shifts": completed_count,
            "weekly_performance_hours": daily_hours,
            "recent_activity": [
                {
                    "application_id": app.id,
                    "title": app.status.replace("_", " ").title(),
                    "hospital": app.job.hospital.name,
                    "department": app.job.department.name,
                    "status": app.status,
                    "time": _format_relative_time(app.updated_at),
                }
                for app in recent_activity
            ],
        }
    )


@require_GET
def staff_schedule(request):
    staff_id = request.GET.get("staff_id")
    if not staff_id:
        return _json_error("staff_id query param is required")

    staff = get_object_or_404(StaffProfile.objects.select_related("user"), id=staff_id)

    pending_qs = (
        staff.job_applications.filter(
            status__in=[JobApplication.Status.APPLIED, JobApplication.Status.SHORTLISTED]
        )
        .select_related("job__department", "job__hospital")
        .order_by("-updated_at")
    )
    confirmed_qs = (
        staff.shift_assignments.filter(status=ShiftAssignment.Status.ASSIGNED)
        .select_related("job__department", "job__hospital")
        .order_by("-assigned_at")
    )

    groups = defaultdict(
        lambda: {
            "title": "",
            "last_activity": "",
            "total_active": 0,
            "confirmed_shifts": [],
            "pending_applications": [],
        }
    )

    for assignment in confirmed_qs:
        dept_name = assignment.job.department.name
        group = groups[dept_name]
        group["title"] = dept_name
        group["last_activity"] = _format_relative_time(assignment.assigned_at)
        group["confirmed_shifts"].append(
            {
                "assignment_id": assignment.id,
                "name": assignment.job.hospital.name,
                "role": assignment.job.profession.name,
                "status": assignment.status,
                "time": f"{assignment.shift_start_snapshot.strftime('%I:%M %p')} - {assignment.shift_end_snapshot.strftime('%I:%M %p')}",
                "date": assignment.shift_start_snapshot.strftime("%b %d, %Y"),
                "pay": str(assignment.job.hourly_rate),
                "currency": assignment.job.currency,
            }
        )

    for app in pending_qs:
        dept_name = app.job.department.name
        group = groups[dept_name]
        group["title"] = dept_name
        if not group["last_activity"]:
            group["last_activity"] = _format_relative_time(app.updated_at)
        group["pending_applications"].append(
            {
                "application_id": app.id,
                "job_id": app.job_id,
                "name": app.job.hospital.name,
                "rating": None,
                "pay": f"{app.job.currency} {app.job.hourly_rate}",
                "status": app.status,
            }
        )

    results = []
    for idx, (_, group) in enumerate(groups.items(), start=1):
        group["id"] = idx
        group["total_active"] = len(group["confirmed_shifts"]) + len(group["pending_applications"])
        results.append(group)

    return JsonResponse({"results": results})


@require_GET
def staff_recommendations(request):
    staff_id = request.GET.get("staff_id")
    department_filter = request.GET.get("department", "All")
    limit = int(request.GET.get("limit", 6))

    if not staff_id:
        return _json_error("staff_id query param is required")

    staff = get_object_or_404(StaffProfile.objects.select_related("profession"), id=staff_id)

    jobs = JobPosting.objects.filter(status=JobPosting.Status.OPEN).select_related(
        "hospital", "department", "profession"
    )
    if department_filter != "All":
        jobs = jobs.filter(department__name__iexact=department_filter)

    review_map = {
        row["hospital_id"]: float(row["avg_rating"])
        for row in HospitalReview.objects.values("hospital_id").annotate(avg_rating=Avg("rating"))
    }

    availability_map = defaultdict(list)
    for slot in AvailabilitySlot.objects.filter(staff=staff, is_active=True):
        availability_map[slot.day_of_week].append((slot.start_time, slot.end_time))

    history_counts = {
        row["job__hospital_id"]: row["count"]
        for row in staff.shift_assignments.values("job__hospital_id").annotate(count=Count("id"))
    }

    # Recommendation scoring is intentionally explainable for hospital/staff trust:
    # - profession_fit (40%): strong signal for qualification match
    # - availability_fit (25%): ensures recommendation is realistically schedulable
    # - hospital_history (20%): rewards continuity where staff has proven history
    # - hospital_rating (15%): uses peer feedback quality signal
    # This weighted decomposition allows both UI and audit logs to show why a shift ranks high.
    scored = []
    for job in jobs:
        profession_fit = 100 if job.profession_id == staff.profession_id else 35

        day = job.shift_start.weekday()
        available_windows = availability_map.get(day, [])
        availability_fit = 30
        for start_time, end_time in available_windows:
            if start_time <= job.shift_start.time() and end_time >= job.shift_end.time():
                availability_fit = 100
                break

        history = min(history_counts.get(job.hospital_id, 0) * 15, 100)
        rating = min((review_map.get(job.hospital_id, 3.5) / 5.0) * 100, 100)

        match_score = round(
            (profession_fit * 0.40)
            + (availability_fit * 0.25)
            + (history * 0.20)
            + (rating * 0.15)
        )

        scored.append(
            {
                "job_id": job.id,
                "name": job.hospital.name,
                "role": f"{job.profession.name} - {job.department.name}",
                "department": job.department.name,
                "match": match_score,
                "hourly_rate": str(job.hourly_rate),
                "currency": job.currency,
                "tags": [
                    {"key": "profession_fit", "value": profession_fit},
                    {"key": "availability_fit", "value": availability_fit},
                    {"key": "hospital_history", "value": history},
                    {"key": "hospital_rating", "value": round(rating, 1)},
                ],
            }
        )

    scored.sort(key=lambda item: item["match"], reverse=True)
    top_results = scored[:limit]
    ai_context = {
        "staff_id": staff.id,
        "staff_profession": staff.profession.name,
        "department_filter": department_filter,
        "limit": limit,
    }
    ai_ready_candidates = [
        {
            "id": item["job_id"],
            "name": item["name"],
            "role": item["role"],
            "department": item["department"],
            "match": item["match"],
            "tags": item.get("tags", []),
        }
        for item in top_results
    ]
    # Keep deterministic ranking as the baseline; AI only augments and reorders when available.
    ai_ranked, ai_meta = enhance_recommendations_with_ai(
        mode="staff_to_hospitals",
        candidates=ai_ready_candidates,
        context=ai_context,
    )

    final_by_id = {item["id"]: item for item in ai_ranked}
    baseline_results = []
    for item in top_results:
        baseline_item = dict(item)
        baseline_item["ai_score"] = baseline_item.get("match", 0)
        baseline_item["ai_reason_short"] = synthesize_short_reason_from_tags(
            baseline_item.get("tags", [])
        )
        baseline_item["ai_reason_details"] = []
        baseline_item["ai_confidence"] = "LOW"
        baseline_results.append(baseline_item)

    final_results = []
    for item in top_results:
        merged_item = dict(item)
        ai_item = final_by_id.get(item["job_id"], {})
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
            key=lambda row: (-(row.get("ai_score") or row.get("match") or 0), -(row.get("match") or 0))
        )
    ensure_unique_reason_messages(final_results)
    ensure_unique_reason_messages(baseline_results)

    return JsonResponse(
        {
            "results": final_results,
            "baseline_results": baseline_results,
            "ai_meta": ai_meta,
            "recommendation_engine": "hybrid_ai" if ai_meta.get("applied") else "deterministic",
        }
    )


@require_GET
def search_directory(request):
    staff_id = request.GET.get("staff_id")
    if not staff_id:
        return _json_error("staff_id query param is required")

    # Validates staff context for role-based access behavior.
    get_object_or_404(StaffProfile.objects.select_related("user"), id=staff_id)
    query = str(request.GET.get("q", "")).strip()

    departments_qs = Department.objects.filter(job_postings__status=JobPosting.Status.OPEN)
    hospitals_qs = Hospital.objects.filter(job_postings__status=JobPosting.Status.OPEN)

    if query:
        departments_qs = departments_qs.filter(
            Q(name__icontains=query) | Q(hospital__name__icontains=query)
        )
        hospitals_qs = hospitals_qs.filter(name__icontains=query)

    departments = list(
        departments_qs.distinct()
        .order_by("name")
        .values("id", "name", "hospital_id", "hospital__name")
    )

    hospitals = list(
        hospitals_qs.distinct()
        .order_by("name")
        .annotate(open_shift_count=Count("job_postings", filter=Q(job_postings__status=JobPosting.Status.OPEN)))
        .values("id", "name", "city", "state", "country", "open_shift_count")
    )

    return JsonResponse(
        {
            "query": query,
            "counts": {
                "departments": len(departments),
                "hospitals": len(hospitals),
            },
            "departments": departments,
            "hospitals": hospitals,
        }
    )


@csrf_exempt
@require_POST
def register_staff(request):
    body = _parse_json_body(request)
    if body is None:
        return _json_error("Invalid JSON body")

    full_name = str(body.get("full_name", "")).strip()
    email = str(body.get("email", "")).strip().lower()
    password = str(body.get("password", ""))
    profession_name = str(body.get("profession", "")).strip()
    availability_days = body.get("availability_days", [])

    if not full_name:
        return _json_error("full_name is required")
    if not email:
        return _json_error("email is required")
    if not password or len(password) < 8:
        return _json_error("password must be at least 8 characters")
    if not profession_name:
        return _json_error("profession is required")
    if not isinstance(availability_days, list):
        return _json_error("availability_days must be a list of weekdays")

    try:
        cleaned_days = sorted({int(day) for day in availability_days})
    except (TypeError, ValueError):
        return _json_error("availability_days must contain weekday integers (0..6)")
    if any(day < 0 or day > 6 for day in cleaned_days):
        return _json_error("availability_days values must be between 0 and 6")

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
            profession = Profession.objects.filter(name__iexact=profession_name).first()
            if not profession:
                profession = Profession.objects.create(name=profession_name)

            user = AppUser.objects.create(
                id=supabase_user_id,
                full_name=full_name,
                email=email,
                role=AppUser.Role.STAFF,
                is_active=True,
            )
            staff_profile = StaffProfile.objects.create(user=user, profession=profession)

            slots = [
                AvailabilitySlot(
                    staff=staff_profile,
                    day_of_week=day,
                    start_time=time(9, 0),
                    end_time=time(17, 0),
                    is_active=True,
                )
                for day in cleaned_days
            ]
            if slots:
                AvailabilitySlot.objects.bulk_create(slots)
    except IntegrityError as exc:
        return _json_error(f"Could not create staff profile: {exc}", status=409)

    return JsonResponse(
        {
            "message": "Staff registration successful",
            "staff_id": staff_profile.id,
            "user_id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "profession": profession.name,
            "availability_days": cleaned_days,
        },
        status=201,
    )


@csrf_exempt
@require_POST
def login_staff(request):
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

    supabase_user_id = session["user"]["id"]
    app_user = AppUser.objects.filter(id=supabase_user_id, role=AppUser.Role.STAFF, is_active=True).first()
    if not app_user:
        return _json_error("Staff profile not found for this account", status=404)

    staff_profile = StaffProfile.objects.filter(user=app_user).first()
    if not staff_profile:
        return _json_error("Staff profile not found for this account", status=404)
    if staff_profile.status != StaffProfile.Status.ACTIVE:
        return _json_error("Staff account is not active", status=403)

    return JsonResponse(
        {
            "message": "Login successful",
            "staff_id": staff_profile.id,
            "user_id": str(app_user.id),
            "email": app_user.email,
            "full_name": app_user.full_name,
            "profession": staff_profile.profession.name,
            "access_token": session.get("access_token"),
            "refresh_token": session.get("refresh_token"),
            "expires_in": session.get("expires_in"),
            "token_type": session.get("token_type"),
        }
    )


@csrf_exempt
@require_POST
def apply_for_job(request, job_id):
    body = _parse_json_body(request)
    if body is None:
        return _json_error("Invalid JSON body")

    staff_id = body.get("staff_id")
    if not staff_id:
        return _json_error("staff_id is required")
    try:
        staff_id = int(staff_id)
    except (TypeError, ValueError):
        return _json_error("staff_id must be an integer")

    job = get_object_or_404(JobPosting, id=job_id)
    application, created = JobApplication.objects.get_or_create(
        job=job,
        staff_id=staff_id,
        defaults={"status": JobApplication.Status.APPLIED},
    )

    if not created and application.status != JobApplication.Status.WITHDRAWN:
        return _json_error("Application already exists for this job and staff", status=409)

    if not created and application.status == JobApplication.Status.WITHDRAWN:
        application.status = JobApplication.Status.APPLIED
        application.applied_at = timezone.now()
        application.save(update_fields=["status", "applied_at", "updated_at"])

    return JsonResponse({"application_id": application.id, "status": application.status}, status=201)


@csrf_exempt
@require_POST
def withdraw_application(request, application_id):
    body = _parse_json_body(request)
    if body is None:
        body = {}

    staff_id = body.get("staff_id")
    application = get_object_or_404(JobApplication, id=application_id)

    if staff_id and str(application.staff_id) != str(staff_id):
        return _json_error("Application does not belong to this staff", status=403)

    application.status = JobApplication.Status.WITHDRAWN
    application.decision_at = timezone.now()
    application.save(update_fields=["status", "decision_at", "updated_at"])

    return JsonResponse({"message": "Application withdrawn", "status": application.status})


@csrf_exempt
@require_POST
def approve_application(request, application_id):
    body = _parse_json_body(request)
    if body is None:
        body = {}

    staff_id = body.get("staff_id")
    if not staff_id:
        return _json_error("staff_id is required")
    try:
        staff_id = int(staff_id)
    except (TypeError, ValueError):
        return _json_error("staff_id must be an integer")

    application = get_object_or_404(
        JobApplication.objects.select_related("job"),
        id=application_id,
    )
    if application.staff_id != staff_id:
        return _json_error("Application does not belong to this staff", status=403)
    if application.status in {JobApplication.Status.REJECTED, JobApplication.Status.WITHDRAWN}:
        return _json_error("Application is not approvable in its current state", status=409)

    if application.status != JobApplication.Status.ACCEPTED:
        application.status = JobApplication.Status.ACCEPTED
        application.decision_at = timezone.now()
        application.save(update_fields=["status", "decision_at", "updated_at"])

    try:
        assignment, created = ShiftAssignment.objects.get_or_create(
            job=application.job,
            staff=application.staff,
            defaults={
                "shift_start_snapshot": application.job.shift_start,
                "shift_end_snapshot": application.job.shift_end,
            },
        )
    except Exception as exc:
        return _json_error(str(exc))

    return JsonResponse(
        {
            "message": "Shift confirmed" if created else "Shift already confirmed",
            "status": application.status,
            "assignment_id": assignment.id,
        }
    )
