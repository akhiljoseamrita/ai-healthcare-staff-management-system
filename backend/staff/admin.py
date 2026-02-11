from django.contrib import admin

from .models import (
    AppUser,
    AvailabilityException,
    AvailabilitySlot,
    Profession,
    Skill,
    StaffProfile,
    StaffSkill,
)


@admin.register(AppUser)
class AppUserAdmin(admin.ModelAdmin):
    list_display = ("email", "full_name", "role", "is_active", "created_at")
    list_filter = ("role", "is_active")
    search_fields = ("email", "full_name")


@admin.register(Profession)
class ProfessionAdmin(admin.ModelAdmin):
    search_fields = ("name",)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    search_fields = ("name",)


@admin.register(StaffProfile)
class StaffProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "profession",
        "status",
        "years_experience",
        "rating_avg",
        "total_completed_shifts",
    )
    list_filter = ("status", "profession")
    search_fields = ("user__email", "user__full_name")


@admin.register(StaffSkill)
class StaffSkillAdmin(admin.ModelAdmin):
    list_display = ("staff", "skill", "proficiency")
    list_filter = ("proficiency", "skill")


@admin.register(AvailabilitySlot)
class AvailabilitySlotAdmin(admin.ModelAdmin):
    list_display = ("staff", "day_of_week", "start_time", "end_time", "is_active")
    list_filter = ("day_of_week", "is_active")


@admin.register(AvailabilityException)
class AvailabilityExceptionAdmin(admin.ModelAdmin):
    list_display = ("staff", "start_at", "end_at", "reason")
    search_fields = ("reason",)
