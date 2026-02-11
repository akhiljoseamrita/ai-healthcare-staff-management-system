from django.contrib import admin

from .models import (
    Attendance,
    Department,
    Hospital,
    HospitalReview,
    JobApplication,
    JobPosting,
    JobRequiredSkill,
    ShiftAssignment,
    StaffHospitalAffiliation,
)


@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ("name", "owner_user", "city", "country", "created_at")
    search_fields = ("name", "owner_user__email", "city", "country")


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ("name", "hospital")
    list_filter = ("hospital",)


@admin.register(StaffHospitalAffiliation)
class StaffHospitalAffiliationAdmin(admin.ModelAdmin):
    list_display = ("staff", "hospital", "status", "created_at")
    list_filter = ("status", "hospital")


@admin.register(JobPosting)
class JobPostingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "hospital",
        "department",
        "profession",
        "status",
        "required_staff_count",
        "shift_start",
        "shift_end",
    )
    list_filter = ("status", "hospital", "department", "profession")


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ("job", "staff", "status", "applied_at", "decision_at")
    list_filter = ("status",)


@admin.register(JobRequiredSkill)
class JobRequiredSkillAdmin(admin.ModelAdmin):
    list_display = ("job", "skill", "minimum_proficiency")
    list_filter = ("minimum_proficiency",)


@admin.register(ShiftAssignment)
class ShiftAssignmentAdmin(admin.ModelAdmin):
    list_display = ("job", "staff", "status", "assigned_at")
    list_filter = ("status",)


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ("assignment", "status", "check_in_time", "check_out_time")
    list_filter = ("status",)


@admin.register(HospitalReview)
class HospitalReviewAdmin(admin.ModelAdmin):
    list_display = ("hospital", "staff", "rating", "created_at")
    list_filter = ("rating",)
