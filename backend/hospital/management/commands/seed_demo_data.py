from datetime import timedelta, time
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from hospital.models import (
    Department,
    Hospital,
    HospitalReview,
    JobPosting,
    JobRequiredSkill,
    ShiftAssignment,
)
from staff.models import (
    AppUser,
    AvailabilitySlot,
    Profession,
    Skill,
    StaffProfile,
    StaffSkill,
)


DEMO_HOSPITAL_NAME = "Demo Central Hospital"
DEMO_OWNER_EMAIL = "demo.hospital.owner@healthcare.local"

DEPARTMENT_TO_PROFESSION = {
    "ICU": "Registered Nurse",
    "Emergency": "Physician Assistant",
    "Radiology": "Physician",
    "Pediatrics": "Nurse Practitioner",
    "Surgery": "Surgeon",
}

STAFF_PER_DEPARTMENT = 6

STAFF_SIDE_HOSPITALS = [
    "Mercy General Hospital",
    "Sunrise Medical Center",
    "Green Valley Hospital",
    "North Star Health",
    "Lakeside Community Hospital",
    "Cityline Care Hospital",
]


class Command(BaseCommand):
    help = (
        "Seed demo data for presentations: "
        "top 6 staff per department (hospital side) and "
        "6 hospitals for staff recommendations (staff side)."
    )

    @transaction.atomic
    def handle(self, *args, **options):
        now = timezone.localtime()
        next_day = now + timedelta(days=1)
        shift_start = next_day.replace(hour=9, minute=0, second=0, microsecond=0)
        shift_end = shift_start + timedelta(hours=8)
        historical_start = shift_start - timedelta(days=14)
        historical_end = historical_start + timedelta(hours=8)

        professions = self._ensure_professions()
        primary_hospital = self._ensure_primary_hospital()
        departments = self._ensure_departments(primary_hospital)

        department_staff = {}
        for dept_name, profession_name in DEPARTMENT_TO_PROFESSION.items():
            dept_staff = self._ensure_staff_for_department(
                dept_name=dept_name,
                profession=professions[profession_name],
            )
            department_staff[dept_name] = dept_staff

        for dept in departments:
            profession = professions[DEPARTMENT_TO_PROFESSION.get(dept.name, "Physician")]
            self._ensure_department_jobs_and_skills(
                hospital=primary_hospital,
                department=dept,
                profession=profession,
                staff_profiles=department_staff.get(dept.name, []),
                shift_start=shift_start,
                shift_end=shift_end,
                historical_start=historical_start,
                historical_end=historical_end,
            )

        demo_viewer = self._ensure_demo_staff_viewer(professions["Registered Nurse"])
        self._ensure_staff_side_hospitals(
            demo_staff=demo_viewer,
            profession=professions["Registered Nurse"],
            shift_start=shift_start,
            shift_end=shift_end,
            historical_start=historical_start,
            historical_end=historical_end,
        )

        self.stdout.write(self.style.SUCCESS("Demo data seeded successfully."))

    def _ensure_professions(self):
        names = {
            "Physician",
            "Registered Nurse",
            "Physician Assistant",
            "Nurse Practitioner",
            "Surgeon",
        }
        result = {}
        for name in names:
            result[name], _ = Profession.objects.get_or_create(name=name)
        return result

    def _ensure_primary_hospital(self):
        owner, _ = AppUser.objects.get_or_create(
            email=DEMO_OWNER_EMAIL,
            defaults={
                "full_name": "Demo Hospital Owner",
                "role": AppUser.Role.HOSPITAL,
                "is_active": True,
            },
        )
        if owner.role != AppUser.Role.HOSPITAL or not owner.is_active:
            owner.role = AppUser.Role.HOSPITAL
            owner.is_active = True
            owner.full_name = "Demo Hospital Owner"
            owner.save(update_fields=["role", "is_active", "full_name", "updated_at"])

        hospital, _ = Hospital.objects.get_or_create(
            owner_user=owner,
            name=DEMO_HOSPITAL_NAME,
            defaults={
                "address": "100 Demo Street",
                "city": "Demo City",
                "state": "Demo State",
                "country": "Demo Country",
                "phone": "+1-555-000-1000",
            },
        )
        return hospital

    def _ensure_departments(self, hospital):
        departments = []
        for dept_name in DEPARTMENT_TO_PROFESSION.keys():
            dept, _ = Department.objects.get_or_create(hospital=hospital, name=dept_name)
            departments.append(dept)
        return departments

    def _ensure_staff_for_department(self, dept_name, profession):
        staff_profiles = []
        slug = dept_name.lower().replace(" ", "-")
        for idx in range(1, STAFF_PER_DEPARTMENT + 1):
            email = f"demo.staff.{slug}.{idx}@healthcare.local"
            full_name = f"{dept_name} Staff {idx}"

            user, _ = AppUser.objects.get_or_create(
                email=email,
                defaults={
                    "full_name": full_name,
                    "role": AppUser.Role.STAFF,
                    "is_active": True,
                },
            )
            if user.role != AppUser.Role.STAFF or not user.is_active:
                user.role = AppUser.Role.STAFF
                user.is_active = True
                user.full_name = full_name
                user.save(update_fields=["role", "is_active", "full_name", "updated_at"])

            staff, _ = StaffProfile.objects.get_or_create(
                user=user,
                defaults={
                    "profession": profession,
                    "status": StaffProfile.Status.ACTIVE,
                    "years_experience": 2 + idx,
                    "rating_avg": Decimal("4.5"),
                    "total_completed_shifts": 10 + idx,
                    "phone": f"+1-555-100-{idx:04d}",
                },
            )
            update_fields = []
            if staff.profession_id != profession.id:
                staff.profession = profession
                update_fields.append("profession")
            if staff.status != StaffProfile.Status.ACTIVE:
                staff.status = StaffProfile.Status.ACTIVE
                update_fields.append("status")
            if not staff.phone:
                staff.phone = f"+1-555-100-{idx:04d}"
                update_fields.append("phone")
            if staff.rating_avg < Decimal("4.3"):
                staff.rating_avg = Decimal("4.6")
                update_fields.append("rating_avg")
            if staff.total_completed_shifts < 8:
                staff.total_completed_shifts = 12 + idx
                update_fields.append("total_completed_shifts")
            if update_fields:
                update_fields.append("updated_at")
                staff.save(update_fields=update_fields)

            self._ensure_full_week_availability(staff)
            self._ensure_profession_skill(staff, profession.name)
            staff_profiles.append(staff)

        return staff_profiles

    def _ensure_full_week_availability(self, staff):
        for day in range(0, 7):
            AvailabilitySlot.objects.get_or_create(
                staff=staff,
                day_of_week=day,
                start_time=time(8, 0),
                end_time=time(20, 0),
                defaults={"is_active": True},
            )

    def _ensure_profession_skill(self, staff, profession_name):
        skill, _ = Skill.objects.get_or_create(name=f"{profession_name} Core")
        StaffSkill.objects.get_or_create(
            staff=staff,
            skill=skill,
            defaults={"proficiency": 5},
        )

    def _ensure_department_jobs_and_skills(
        self,
        hospital,
        department,
        profession,
        staff_profiles,
        shift_start,
        shift_end,
        historical_start,
        historical_end,
    ):
        open_job, _ = JobPosting.objects.get_or_create(
            hospital=hospital,
            department=department,
            profession=profession,
            shift_start=shift_start,
            shift_end=shift_end,
            defaults={
                "required_staff_count": STAFF_PER_DEPARTMENT,
                "description": f"DEMO_OPEN_{department.name}",
                "hourly_rate": Decimal("65.00"),
                "currency": "USD",
                "status": JobPosting.Status.OPEN,
                "city": "Demo City",
                "state": "Demo State",
                "country": "Demo Country",
            },
        )
        open_job.status = JobPosting.Status.OPEN
        open_job.required_staff_count = STAFF_PER_DEPARTMENT
        open_job.hourly_rate = Decimal("65.00")
        open_job.description = f"DEMO_OPEN_{department.name}"
        open_job.save(
            update_fields=[
                "status",
                "required_staff_count",
                "hourly_rate",
                "description",
                "updated_at",
            ]
        )

        profession_skill, _ = Skill.objects.get_or_create(name=f"{profession.name} Core")
        JobRequiredSkill.objects.get_or_create(
            job=open_job,
            skill=profession_skill,
            defaults={"minimum_proficiency": 4},
        )

        historical_job, _ = JobPosting.objects.get_or_create(
            hospital=hospital,
            department=department,
            profession=profession,
            shift_start=historical_start,
            shift_end=historical_end,
            defaults={
                "required_staff_count": STAFF_PER_DEPARTMENT,
                "description": f"DEMO_HISTORY_{department.name}",
                "hourly_rate": Decimal("55.00"),
                "currency": "USD",
                "status": JobPosting.Status.CLOSED,
                "city": "Demo City",
                "state": "Demo State",
                "country": "Demo Country",
            },
        )
        historical_job.status = JobPosting.Status.CLOSED
        historical_job.description = f"DEMO_HISTORY_{department.name}"
        historical_job.save(update_fields=["status", "description", "updated_at"])

        for staff in staff_profiles:
            assignment, created = ShiftAssignment.objects.get_or_create(
                job=historical_job,
                staff=staff,
                defaults={
                    "status": ShiftAssignment.Status.COMPLETED,
                    "shift_start_snapshot": historical_start,
                    "shift_end_snapshot": historical_end,
                },
            )
            if not created and assignment.status != ShiftAssignment.Status.COMPLETED:
                assignment.status = ShiftAssignment.Status.COMPLETED
                assignment.shift_start_snapshot = historical_start
                assignment.shift_end_snapshot = historical_end
                assignment.save(
                    update_fields=[
                        "status",
                        "shift_start_snapshot",
                        "shift_end_snapshot",
                        "updated_at",
                    ]
                )

    def _ensure_demo_staff_viewer(self, profession):
        email = "demo.staff.viewer@healthcare.local"
        user, _ = AppUser.objects.get_or_create(
            email=email,
            defaults={
                "full_name": "Demo Staff Viewer",
                "role": AppUser.Role.STAFF,
                "is_active": True,
            },
        )
        if user.role != AppUser.Role.STAFF or not user.is_active:
            user.role = AppUser.Role.STAFF
            user.is_active = True
            user.full_name = "Demo Staff Viewer"
            user.save(update_fields=["role", "is_active", "full_name", "updated_at"])

        staff, _ = StaffProfile.objects.get_or_create(
            user=user,
            defaults={
                "profession": profession,
                "status": StaffProfile.Status.ACTIVE,
                "years_experience": 5,
                "rating_avg": Decimal("4.8"),
                "total_completed_shifts": 36,
                "phone": "+1-555-777-0001",
            },
        )
        if staff.profession_id != profession.id or staff.status != StaffProfile.Status.ACTIVE:
            staff.profession = profession
            staff.status = StaffProfile.Status.ACTIVE
            staff.save(update_fields=["profession", "status", "updated_at"])

        self._ensure_full_week_availability(staff)
        self._ensure_profession_skill(staff, profession.name)
        return staff

    def _ensure_staff_side_hospitals(
        self,
        demo_staff,
        profession,
        shift_start,
        shift_end,
        historical_start,
        historical_end,
    ):
        for index, hospital_name in enumerate(STAFF_SIDE_HOSPITALS, start=1):
            owner_email = f"demo.owner.{index}@healthcare.local"
            owner, _ = AppUser.objects.get_or_create(
                email=owner_email,
                defaults={
                    "full_name": f"{hospital_name} Owner",
                    "role": AppUser.Role.HOSPITAL,
                    "is_active": True,
                },
            )
            if owner.role != AppUser.Role.HOSPITAL:
                owner.role = AppUser.Role.HOSPITAL
                owner.is_active = True
                owner.save(update_fields=["role", "is_active", "updated_at"])

            hospital, _ = Hospital.objects.get_or_create(
                owner_user=owner,
                name=hospital_name,
                defaults={
                    "address": f"{index} Health Avenue",
                    "city": "Demo City",
                    "state": "Demo State",
                    "country": "Demo Country",
                    "phone": f"+1-555-200-{index:04d}",
                },
            )
            dept, _ = Department.objects.get_or_create(hospital=hospital, name="General Medicine")

            open_job, _ = JobPosting.objects.get_or_create(
                hospital=hospital,
                department=dept,
                profession=profession,
                shift_start=shift_start,
                shift_end=shift_end,
                defaults={
                    "required_staff_count": 3,
                    "description": "DEMO_STAFF_SIDE_OPEN",
                    "hourly_rate": Decimal("70.00"),
                    "currency": "USD",
                    "status": JobPosting.Status.OPEN,
                    "city": "Demo City",
                    "state": "Demo State",
                    "country": "Demo Country",
                },
            )
            open_job.status = JobPosting.Status.OPEN
            open_job.description = "DEMO_STAFF_SIDE_OPEN"
            open_job.save(update_fields=["status", "description", "updated_at"])

            history_job, _ = JobPosting.objects.get_or_create(
                hospital=hospital,
                department=dept,
                profession=profession,
                shift_start=historical_start,
                shift_end=historical_end,
                defaults={
                    "required_staff_count": 1,
                    "description": "DEMO_STAFF_SIDE_HISTORY",
                    "hourly_rate": Decimal("62.00"),
                    "currency": "USD",
                    "status": JobPosting.Status.CLOSED,
                    "city": "Demo City",
                    "state": "Demo State",
                    "country": "Demo Country",
                },
            )
            history_job.status = JobPosting.Status.CLOSED
            history_job.description = "DEMO_STAFF_SIDE_HISTORY"
            history_job.save(update_fields=["status", "description", "updated_at"])

            assignment, created = ShiftAssignment.objects.get_or_create(
                job=history_job,
                staff=demo_staff,
                defaults={
                    "status": ShiftAssignment.Status.COMPLETED,
                    "shift_start_snapshot": historical_start,
                    "shift_end_snapshot": historical_end,
                },
            )
            if not created and assignment.status != ShiftAssignment.Status.COMPLETED:
                assignment.status = ShiftAssignment.Status.COMPLETED
                assignment.shift_start_snapshot = historical_start
                assignment.shift_end_snapshot = historical_end
                assignment.save(
                    update_fields=[
                        "status",
                        "shift_start_snapshot",
                        "shift_end_snapshot",
                        "updated_at",
                    ]
                )

            HospitalReview.objects.get_or_create(
                staff=demo_staff,
                hospital=hospital,
                defaults={
                    "rating": Decimal("4.8"),
                    "review_text": "Reliable scheduling and supportive team environment.",
                },
            )
