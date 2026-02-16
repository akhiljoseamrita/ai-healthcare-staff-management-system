import json
from datetime import time, timedelta
from uuid import uuid4
from unittest.mock import patch

from django.core.exceptions import ValidationError
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone

from hospital.models import Department, Hospital, JobApplication, JobPosting, ShiftAssignment
from staff.models import AppUser, AvailabilitySlot, Profession, StaffProfile


class AvailabilitySlotTests(TestCase):
    def test_requires_start_before_end(self):
        user = AppUser.objects.create(
            id=uuid4(),
            full_name="Staff Member",
            email="slot-user@example.com",
            role=AppUser.Role.STAFF,
        )
        profession = Profession.objects.create(name="Doctor")
        profile = StaffProfile.objects.create(user=user, profession=profession)

        invalid_slot = AvailabilitySlot(
            staff=profile,
            day_of_week=AvailabilitySlot.WeekDay.MONDAY,
            start_time=time(18, 0),
            end_time=time(8, 0),
            is_active=True,
        )

        with self.assertRaises(ValidationError):
            invalid_slot.full_clean()


class StaffRecommendationApiTests(TestCase):
    def setUp(self):
        self.client = Client()

        self.owner = AppUser.objects.create(
            id=uuid4(),
            full_name="Hospital Owner",
            email="owner2@example.com",
            role=AppUser.Role.HOSPITAL,
        )
        self.staff_user = AppUser.objects.create(
            id=uuid4(),
            full_name="Nurse A",
            email="nurse@example.com",
            role=AppUser.Role.STAFF,
        )

        self.nurse = Profession.objects.create(name="Nurse")
        self.staff_profile = StaffProfile.objects.create(
            user=self.staff_user,
            profession=self.nurse,
            rating_avg=4.6,
        )

        hospital = Hospital.objects.create(owner_user=self.owner, name="City General")
        department = Department.objects.create(hospital=hospital, name="ICU")

        JobPosting.objects.create(
            hospital=hospital,
            department=department,
            profession=self.nurse,
            required_staff_count=2,
            shift_start=timezone.now() + timedelta(days=1),
            shift_end=timezone.now() + timedelta(days=1, hours=8),
            hourly_rate=70,
            currency="USD",
        )

    def test_recommendations_endpoint_returns_results(self):
        response = self.client.get(
            reverse("staff-recommendations"),
            {"staff_id": self.staff_profile.id, "department": "All", "limit": 6},
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("results", payload)
        self.assertGreaterEqual(len(payload["results"]), 1)


class StaffAuthApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.profession = Profession.objects.create(name="Registered Nurse")
        self.user = AppUser.objects.create(
            id=uuid4(),
            full_name="Login User",
            email="login.user@example.com",
            role=AppUser.Role.STAFF,
            is_active=True,
        )
        self.staff = StaffProfile.objects.create(
            user=self.user,
            profession=self.profession,
            status=StaffProfile.Status.ACTIVE,
        )

    @patch("staff.views._login_supabase_user")
    def test_staff_login_success(self, mock_login):
        mock_login.return_value = {
            "access_token": "token-1",
            "refresh_token": "token-2",
            "expires_in": 3600,
            "token_type": "bearer",
            "user": {"id": str(self.user.id)},
        }

        response = self.client.post(
            reverse("staff-login"),
            data=json.dumps({"email": self.user.email, "password": "secret123"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["staff_id"], self.staff.id)
        self.assertEqual(payload["email"], self.user.email)
        self.assertEqual(payload["access_token"], "token-1")

    @patch("staff.views._login_supabase_user")
    def test_staff_login_missing_profile_returns_404(self, mock_login):
        random_user_id = str(uuid4())
        mock_login.return_value = {
            "access_token": "token-1",
            "refresh_token": "token-2",
            "expires_in": 3600,
            "token_type": "bearer",
            "user": {"id": random_user_id},
        }

        response = self.client.post(
            reverse("staff-login"),
            data=json.dumps({"email": "unknown@example.com", "password": "secret123"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 404)


class StaffApplicationApprovalApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.owner = AppUser.objects.create(
            id=uuid4(),
            full_name="Hospital Owner",
            email="owner-approval@example.com",
            role=AppUser.Role.HOSPITAL,
        )
        self.staff_user = AppUser.objects.create(
            id=uuid4(),
            full_name="Staff Approver",
            email="staff-approval@example.com",
            role=AppUser.Role.STAFF,
            is_active=True,
        )
        self.profession = Profession.objects.create(name="Nurse")
        self.staff = StaffProfile.objects.create(
            user=self.staff_user,
            profession=self.profession,
            status=StaffProfile.Status.ACTIVE,
        )
        self.hospital = Hospital.objects.create(owner_user=self.owner, name="Approval Hospital")
        self.department = Department.objects.create(hospital=self.hospital, name="ICU")
        self.job = JobPosting.objects.create(
            hospital=self.hospital,
            department=self.department,
            profession=self.profession,
            required_staff_count=1,
            shift_start=timezone.now() + timedelta(days=1),
            shift_end=timezone.now() + timedelta(days=1, hours=8),
            hourly_rate=70,
            currency="USD",
        )

    def test_staff_can_approve_shortlisted_invitation_and_get_assignment(self):
        application = JobApplication.objects.create(
            job=self.job,
            staff=self.staff,
            status=JobApplication.Status.SHORTLISTED,
        )

        response = self.client.post(
            reverse("approve-application", args=[application.id]),
            data=json.dumps({"staff_id": self.staff.id}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)

        application.refresh_from_db()
        self.assertEqual(application.status, JobApplication.Status.ACCEPTED)
        self.assertTrue(ShiftAssignment.objects.filter(job=self.job, staff=self.staff).exists())
