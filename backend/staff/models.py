import uuid

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class AppUser(TimeStampedModel):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        HOSPITAL = "HOSPITAL", "Hospital"
        STAFF = "STAFF", "Staff"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Mirrors Supabase auth.users.id so app data stays aligned with external auth.",
    )
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=16, choices=Role.choices)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "app_users"

    def __str__(self):
        return f"{self.full_name} ({self.role})"


class Profession(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)

    class Meta:
        db_table = "professions"

    def __str__(self):
        return self.name


class Skill(TimeStampedModel):
    name = models.CharField(max_length=120, unique=True)

    class Meta:
        db_table = "skills"

    def __str__(self):
        return self.name


class StaffProfile(TimeStampedModel):
    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        INACTIVE = "INACTIVE", "Inactive"
        BLOCKED = "BLOCKED", "Blocked"

    user = models.OneToOneField(AppUser, on_delete=models.CASCADE, related_name="staff_profile")
    profession = models.ForeignKey(
        Profession,
        on_delete=models.PROTECT,
        related_name="staff_profiles",
    )
    phone = models.CharField(max_length=24, blank=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ACTIVE)
    years_experience = models.PositiveIntegerField(default=0)
    rating_avg = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)],
    )
    total_completed_shifts = models.PositiveIntegerField(default=0)
    avatar_url = models.URLField(blank=True)

    class Meta:
        db_table = "staff_profiles"

    def __str__(self):
        return f"{self.user.full_name} - {self.profession.name}"


class StaffSkill(TimeStampedModel):
    staff = models.ForeignKey(
        StaffProfile,
        on_delete=models.CASCADE,
        related_name="staff_skills",
    )
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE, related_name="staff_skills")
    proficiency = models.PositiveSmallIntegerField(
        default=3,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="1..5 scale used by recommendation ranking.",
    )

    class Meta:
        db_table = "staff_skills"
        constraints = [
            models.UniqueConstraint(fields=["staff", "skill"], name="unique_staff_skill"),
        ]

    def __str__(self):
        return f"{self.staff_id}:{self.skill.name}"


class AvailabilitySlot(TimeStampedModel):
    class WeekDay(models.IntegerChoices):
        SUNDAY = 0, "Sunday"
        MONDAY = 1, "Monday"
        TUESDAY = 2, "Tuesday"
        WEDNESDAY = 3, "Wednesday"
        THURSDAY = 4, "Thursday"
        FRIDAY = 5, "Friday"
        SATURDAY = 6, "Saturday"

    staff = models.ForeignKey(
        StaffProfile,
        on_delete=models.CASCADE,
        related_name="availability_slots",
    )
    day_of_week = models.PositiveSmallIntegerField(choices=WeekDay.choices)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "availability_slots"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(start_time__lt=models.F("end_time")),
                name="availability_start_before_end",
            ),
        ]

    def __str__(self):
        return f"{self.staff_id} {self.day_of_week} {self.start_time}-{self.end_time}"


class AvailabilityException(TimeStampedModel):
    staff = models.ForeignKey(
        StaffProfile,
        on_delete=models.CASCADE,
        related_name="availability_exceptions",
    )
    start_at = models.DateTimeField()
    end_at = models.DateTimeField()
    reason = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "availability_exceptions"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(start_at__lt=models.F("end_at")),
                name="availability_exception_start_before_end",
            ),
        ]

    def __str__(self):
        return f"{self.staff_id} exception {self.start_at} -> {self.end_at}"
