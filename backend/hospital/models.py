from datetime import timedelta

from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone as dj_timezone


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Hospital(TimeStampedModel):
    owner_user = models.ForeignKey(
        "staff.AppUser",
        on_delete=models.PROTECT,
        related_name="owned_hospitals",
    )
    name = models.CharField(max_length=255)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=24, blank=True)
    logo_url = models.URLField(blank=True)
    city = models.CharField(max_length=128, blank=True)
    state = models.CharField(max_length=128, blank=True)
    country = models.CharField(max_length=128, blank=True)

    class Meta:
        db_table = "hospitals"

    def __str__(self):
        return self.name


class Department(TimeStampedModel):
    hospital = models.ForeignKey(
        Hospital,
        on_delete=models.CASCADE,
        related_name="departments",
    )
    name = models.CharField(max_length=120)

    class Meta:
        db_table = "departments"
        constraints = [
            models.UniqueConstraint(
                fields=["hospital", "name"],
                name="unique_department_per_hospital",
            ),
        ]

    def __str__(self):
        return f"{self.hospital.name} - {self.name}"


class StaffHospitalAffiliation(TimeStampedModel):
    class Status(models.TextChoices):
        APPROVED = "APPROVED", "Approved"
        PENDING = "PENDING", "Pending"
        REJECTED = "REJECTED", "Rejected"

    staff = models.ForeignKey(
        "staff.StaffProfile",
        on_delete=models.CASCADE,
        related_name="hospital_affiliations",
    )
    hospital = models.ForeignKey(
        Hospital,
        on_delete=models.CASCADE,
        related_name="staff_affiliations",
    )
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.PENDING)

    class Meta:
        db_table = "staff_hospital_affiliations"
        constraints = [
            models.UniqueConstraint(
                fields=["staff", "hospital"],
                name="unique_staff_hospital_affiliation",
            ),
        ]

    def __str__(self):
        return f"{self.staff_id} @ {self.hospital_id} ({self.status})"


class JobPosting(TimeStampedModel):
    class Status(models.TextChoices):
        OPEN = "OPEN", "Open"
        CLOSED = "CLOSED", "Closed"
        CANCELLED = "CANCELLED", "Cancelled"

    class ShiftType(models.TextChoices):
        DAY = "DAY", "Day"
        NIGHT = "NIGHT", "Night"
        ON_CALL = "ON_CALL", "On Call"

    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="job_postings")
    department = models.ForeignKey(
        Department,
        on_delete=models.PROTECT,
        related_name="job_postings",
    )
    profession = models.ForeignKey(
        "staff.Profession",
        on_delete=models.PROTECT,
        related_name="job_postings",
    )
    required_staff_count = models.PositiveIntegerField()
    shift_start = models.DateTimeField()
    shift_end = models.DateTimeField()
    timezone = models.CharField(max_length=64, default="UTC")
    shift_type = models.CharField(max_length=16, choices=ShiftType.choices, default=ShiftType.DAY)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.OPEN)
    published_at = models.DateTimeField(default=dj_timezone.now)
    closed_at = models.DateTimeField(null=True, blank=True)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2)
    currency = models.CharField(max_length=3, default="USD")
    city = models.CharField(max_length=128, blank=True)
    state = models.CharField(max_length=128, blank=True)
    country = models.CharField(max_length=128, blank=True)

    class Meta:
        db_table = "job_postings"
        constraints = [
            models.CheckConstraint(
                condition=models.Q(shift_start__lt=models.F("shift_end")),
                name="job_posting_shift_start_before_end",
            ),
            models.CheckConstraint(
                condition=models.Q(required_staff_count__gt=0),
                name="job_posting_required_staff_positive",
            ),
        ]

    def clean(self):
        if self.department_id and self.hospital_id and self.department.hospital_id != self.hospital_id:
            raise ValidationError("Department must belong to the same hospital as the job posting.")

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.hospital.name} - {self.profession.name} ({self.shift_start})"


class JobRequiredSkill(TimeStampedModel):
    job = models.ForeignKey(
        JobPosting,
        on_delete=models.CASCADE,
        related_name="required_skills",
    )
    skill = models.ForeignKey(
        "staff.Skill",
        on_delete=models.CASCADE,
        related_name="job_requirements",
    )
    minimum_proficiency = models.PositiveSmallIntegerField(
        default=3,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )

    class Meta:
        db_table = "job_required_skills"
        constraints = [
            models.UniqueConstraint(fields=["job", "skill"], name="unique_job_required_skill"),
        ]

    def __str__(self):
        return f"job={self.job_id} skill={self.skill_id} min={self.minimum_proficiency}"


class JobApplication(TimeStampedModel):
    class Status(models.TextChoices):
        APPLIED = "APPLIED", "Applied"
        SHORTLISTED = "SHORTLISTED", "Shortlisted"
        ACCEPTED = "ACCEPTED", "Accepted"
        REJECTED = "REJECTED", "Rejected"
        WITHDRAWN = "WITHDRAWN", "Withdrawn"

    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name="applications")
    staff = models.ForeignKey(
        "staff.StaffProfile",
        on_delete=models.CASCADE,
        related_name="job_applications",
    )
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.APPLIED)
    applied_at = models.DateTimeField(auto_now_add=True)
    decision_at = models.DateTimeField(null=True, blank=True)
    note = models.TextField(blank=True)

    class Meta:
        db_table = "job_applications"
        constraints = [
            models.UniqueConstraint(fields=["job", "staff"], name="unique_job_staff_application"),
        ]

    def __str__(self):
        return f"job={self.job_id} staff={self.staff_id} ({self.status})"


class ShiftAssignment(TimeStampedModel):
    class Status(models.TextChoices):
        ASSIGNED = "ASSIGNED", "Assigned"
        CANCELLED = "CANCELLED", "Cancelled"
        COMPLETED = "COMPLETED", "Completed"

    job = models.ForeignKey(JobPosting, on_delete=models.CASCADE, related_name="assignments")
    staff = models.ForeignKey(
        "staff.StaffProfile",
        on_delete=models.CASCADE,
        related_name="shift_assignments",
    )
    assigned_at = models.DateTimeField(auto_now_add=True)
    assigned_by_user = models.ForeignKey(
        "staff.AppUser",
        on_delete=models.PROTECT,
        related_name="created_assignments",
        null=True,
        blank=True,
    )
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.ASSIGNED)
    shift_start_snapshot = models.DateTimeField()
    shift_end_snapshot = models.DateTimeField()

    class Meta:
        db_table = "shift_assignments"
        constraints = [
            models.UniqueConstraint(fields=["job", "staff"], name="unique_job_staff_assignment"),
            models.CheckConstraint(
                condition=models.Q(shift_start_snapshot__lt=models.F("shift_end_snapshot")),
                name="assignment_start_before_end",
            ),
        ]

    def _validate_no_overlap(self):
        overlapping = ShiftAssignment.objects.filter(
            staff=self.staff,
            status=ShiftAssignment.Status.ASSIGNED,
            shift_start_snapshot__lt=self.shift_end_snapshot,
            shift_end_snapshot__gt=self.shift_start_snapshot,
        ).exclude(pk=self.pk)

        if overlapping.exists():
            raise ValidationError("Staff already has an overlapping active shift assignment.")

    def _validate_three_day_limit(self):
        # Regulatory rule: a staff member may work at most 3 calendar days in the
        # ISO week of the target assignment. This keeps scheduling compliant while
        # still allowing multiple non-overlapping shifts on the same day.
        target_day = dj_timezone.localdate(self.shift_start_snapshot)
        week_start = target_day - timedelta(days=target_day.weekday())
        week_end = week_start + timedelta(days=7)

        assignments = ShiftAssignment.objects.filter(
            staff=self.staff,
            status__in=[ShiftAssignment.Status.ASSIGNED, ShiftAssignment.Status.COMPLETED],
            shift_start_snapshot__date__gte=week_start,
            shift_start_snapshot__date__lt=week_end,
        ).exclude(pk=self.pk)

        working_days = {item.shift_start_snapshot.date() for item in assignments}
        working_days.add(target_day)

        if len(working_days) > 3:
            raise ValidationError("Assignment violates 3-day weekly work limit for staff.")

    def clean(self):
        if not self.shift_start_snapshot:
            self.shift_start_snapshot = self.job.shift_start
        if not self.shift_end_snapshot:
            self.shift_end_snapshot = self.job.shift_end

        if self.status == ShiftAssignment.Status.ASSIGNED:
            self._validate_no_overlap()
            self._validate_three_day_limit()

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"assignment job={self.job_id} staff={self.staff_id} ({self.status})"


class Attendance(TimeStampedModel):
    class Status(models.TextChoices):
        PRESENT = "PRESENT", "Present"
        ABSENT = "ABSENT", "Absent"
        PARTIAL = "PARTIAL", "Partial"

    assignment = models.OneToOneField(
        ShiftAssignment,
        on_delete=models.CASCADE,
        related_name="attendance",
    )
    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=16, choices=Status.choices, default=Status.PRESENT)

    class Meta:
        db_table = "attendance"

    def clean(self):
        if self.check_in_time and self.check_out_time and self.check_out_time <= self.check_in_time:
            raise ValidationError("check_out_time must be later than check_in_time.")

    def save(self, *args, **kwargs):
        self.full_clean()
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"attendance assignment={self.assignment_id} ({self.status})"


class HospitalReview(TimeStampedModel):
    staff = models.ForeignKey(
        "staff.StaffProfile",
        on_delete=models.CASCADE,
        related_name="hospital_reviews",
    )
    hospital = models.ForeignKey(
        Hospital,
        on_delete=models.CASCADE,
        related_name="reviews",
    )
    rating = models.DecimalField(
        max_digits=2,
        decimal_places=1,
        validators=[MinValueValidator(1), MaxValueValidator(5)],
    )
    review_text = models.TextField(blank=True)

    class Meta:
        db_table = "hospital_reviews"
        constraints = [
            models.UniqueConstraint(
                fields=["staff", "hospital"],
                name="unique_staff_hospital_review",
            ),
        ]

    def __str__(self):
        return f"review staff={self.staff_id} hospital={self.hospital_id}"
