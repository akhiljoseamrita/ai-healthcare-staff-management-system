import json
from datetime import timedelta
from unittest.mock import patch
from uuid import uuid4

from django.core.exceptions import ValidationError
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone

from hospital.models import Department, Hospital, JobApplication, JobPosting, JobRequiredSkill, ShiftAssignment
from staff.models import AppUser, Profession, Skill, StaffProfile, StaffSkill


class ShiftAssignmentRuleTests(TestCase):
    def setUp(self):
        self.owner = AppUser.objects.create(
            id=uuid4(),
            full_name="Hospital Owner",
            email="owner@example.com",
            role=AppUser.Role.HOSPITAL,
        )
        self.staff_user = AppUser.objects.create(
            id=uuid4(),
            full_name="Staff One",
            email="staff@example.com",
            role=AppUser.Role.STAFF,
        )
        self.profession = Profession.objects.create(name="Nurse")
        self.staff_profile = StaffProfile.objects.create(
            user=self.staff_user,
            profession=self.profession,
        )
        self.hospital = Hospital.objects.create(owner_user=self.owner, name="General Hospital")
        self.department = Department.objects.create(hospital=self.hospital, name="ICU")

    def _create_job(self, start_dt, hours=8):
        return JobPosting.objects.create(
            hospital=self.hospital,
            department=self.department,
            profession=self.profession,
            required_staff_count=1,
            shift_start=start_dt,
            shift_end=start_dt + timedelta(hours=hours),
            hourly_rate=65,
            currency="USD",
        )

    def test_rejects_overlapping_assignments(self):
        start = timezone.now() + timedelta(days=1)
        first_job = self._create_job(start)
        second_job = self._create_job(start + timedelta(hours=2))

        ShiftAssignment.objects.create(job=first_job, staff=self.staff_profile)

        with self.assertRaises(ValidationError):
            ShiftAssignment.objects.create(job=second_job, staff=self.staff_profile)

    def test_enforces_three_day_week_limit(self):
        base = timezone.now().replace(hour=8, minute=0, second=0, microsecond=0)
        monday = base - timedelta(days=base.weekday())

        day1 = self._create_job(monday + timedelta(days=0))
        day2 = self._create_job(monday + timedelta(days=1))
        day3 = self._create_job(monday + timedelta(days=2))
        day4 = self._create_job(monday + timedelta(days=3))

        ShiftAssignment.objects.create(job=day1, staff=self.staff_profile)
        ShiftAssignment.objects.create(job=day2, staff=self.staff_profile)
        ShiftAssignment.objects.create(job=day3, staff=self.staff_profile)

        with self.assertRaises(ValidationError):
            ShiftAssignment.objects.create(job=day4, staff=self.staff_profile)


class HospitalApiTests(TestCase):
    def setUp(self):
        self.client = Client()

        self.owner = AppUser.objects.create(
            id=uuid4(),
            full_name="Hospital Owner 2",
            email="owner-api@example.com",
            role=AppUser.Role.HOSPITAL,
        )
        self.staff_user = AppUser.objects.create(
            id=uuid4(),
            full_name="Staff API",
            email="staff-api@example.com",
            role=AppUser.Role.STAFF,
        )
        self.profession = Profession.objects.create(name="Technician")
        self.staff_profile = StaffProfile.objects.create(
            user=self.staff_user,
            profession=self.profession,
            rating_avg=4.2,
        )
        self.hospital = Hospital.objects.create(owner_user=self.owner, name="API Hospital")
        self.department = Department.objects.create(hospital=self.hospital, name="Radiology")
        self.job = JobPosting.objects.create(
            hospital=self.hospital,
            department=self.department,
            profession=self.profession,
            required_staff_count=1,
            shift_start=timezone.now() + timedelta(days=1),
            shift_end=timezone.now() + timedelta(days=1, hours=6),
            hourly_rate=50,
            currency="USD",
        )
        self.skill = Skill.objects.create(name="X-Ray")
        JobRequiredSkill.objects.create(job=self.job, skill=self.skill, minimum_proficiency=4)

    def test_shift_summary_endpoint(self):
        response = self.client.get(reverse("shift-summary-list"), {"hospital_id": self.hospital.id})
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("results", payload)

    def test_can_create_application_and_assign(self):
        application = JobApplication.objects.create(job=self.job, staff=self.staff_profile)

        response = self.client.post(
            reverse("create-shift-assignment", args=[self.job.id]),
            data=json.dumps({"staff_id": self.staff_profile.id, "assigned_by_user_id": str(self.owner.id)}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

        decision = self.client.post(
            reverse("update-application-status", args=[application.id]),
            data=json.dumps({"status": JobApplication.Status.ACCEPTED}),
            content_type="application/json",
        )
        self.assertEqual(decision.status_code, 200)
        application.refresh_from_db()
        self.assertEqual(application.status, JobApplication.Status.ACCEPTED)

    def test_invitation_stays_pending_until_application_accepted(self):
        response = self.client.post(
            reverse("create-shift-assignment", args=[self.job.id]),
            data=json.dumps({"staff_id": self.staff_profile.id, "assigned_by_user_id": str(self.owner.id)}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)

        application = JobApplication.objects.get(job=self.job, staff=self.staff_profile)
        self.assertEqual(application.status, JobApplication.Status.SHORTLISTED)
        self.assertFalse(
            ShiftAssignment.objects.filter(job=self.job, staff=self.staff_profile).exists()
        )

        decision = self.client.post(
            reverse("update-application-status", args=[application.id]),
            data=json.dumps({"status": JobApplication.Status.ACCEPTED}),
            content_type="application/json",
        )
        self.assertEqual(decision.status_code, 200)

        assign_after_accept = self.client.post(
            reverse("create-shift-assignment", args=[self.job.id]),
            data=json.dumps({"staff_id": self.staff_profile.id, "assigned_by_user_id": str(self.owner.id)}),
            content_type="application/json",
        )
        self.assertEqual(assign_after_accept.status_code, 201)
        self.assertTrue(
            ShiftAssignment.objects.filter(job=self.job, staff=self.staff_profile).exists()
        )

    def test_hospital_recommendations_exclude_inactive_and_rank_by_skill(self):
        high_skill_user = AppUser.objects.create(
            id=uuid4(),
            full_name="High Skill",
            email="high@example.com",
            role=AppUser.Role.STAFF,
        )
        high_skill_staff = StaffProfile.objects.create(
            user=high_skill_user,
            profession=self.profession,
            rating_avg=4.8,
        )
        StaffSkill.objects.create(staff=high_skill_staff, skill=self.skill, proficiency=5)

        low_skill_user = AppUser.objects.create(
            id=uuid4(),
            full_name="Low Skill",
            email="low@example.com",
            role=AppUser.Role.STAFF,
        )
        low_skill_staff = StaffProfile.objects.create(
            user=low_skill_user,
            profession=self.profession,
            rating_avg=4.8,
        )
        StaffSkill.objects.create(staff=low_skill_staff, skill=self.skill, proficiency=1)

        inactive_user = AppUser.objects.create(
            id=uuid4(),
            full_name="Inactive Skill",
            email="inactive@example.com",
            role=AppUser.Role.STAFF,
            is_active=False,
        )
        inactive_staff = StaffProfile.objects.create(
            user=inactive_user,
            profession=self.profession,
            rating_avg=5.0,
        )
        StaffSkill.objects.create(staff=inactive_staff, skill=self.skill, proficiency=5)

        response = self.client.get(
            reverse("hospital-staff-recommendations"),
            {"job_id": self.job.id, "limit": 10},
        )
        self.assertEqual(response.status_code, 200)
        payload = response.json()["results"]

        ids = [item["staff_id"] for item in payload]
        self.assertIn(high_skill_staff.id, ids)
        self.assertIn(low_skill_staff.id, ids)
        self.assertNotIn(inactive_staff.id, ids)

        index_by_id = {item["staff_id"]: index for index, item in enumerate(payload)}
        self.assertLess(index_by_id[high_skill_staff.id], index_by_id[low_skill_staff.id])


class HospitalAuthApiTests(TestCase):
    def setUp(self):
        self.client = Client()

    @patch("hospital.views._signup_supabase_user")
    def test_register_hospital_creates_user_and_hospital(self, mock_signup):
        user_id = str(uuid4())
        mock_signup.return_value = user_id

        response = self.client.post(
            reverse("hospital-register"),
            data=json.dumps(
                {
                    "hospital_name": "Metro Care",
                    "registration_number": "REG-1001",
                    "email": "metro@example.com",
                    "phone": "+15550000000",
                    "location": "Main Street",
                    "password": "password123",
                    "confirm_password": "password123",
                }
            ),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 201)
        payload = response.json()
        self.assertEqual(payload["hospital_name"], "Metro Care")
        self.assertTrue(Hospital.objects.filter(id=payload["hospital_id"]).exists())
        self.assertTrue(AppUser.objects.filter(id=user_id, role=AppUser.Role.HOSPITAL).exists())

    @patch("hospital.views._login_supabase_user")
    def test_login_hospital_returns_session_payload(self, mock_login):
        user_id = uuid4()
        owner = AppUser.objects.create(
            id=user_id,
            full_name="City Hospital",
            email="city@example.com",
            role=AppUser.Role.HOSPITAL,
        )
        hospital = Hospital.objects.create(owner_user=owner, name="City Hospital")
        mock_login.return_value = {
            "access_token": "token-1",
            "refresh_token": "token-2",
            "expires_in": 3600,
            "token_type": "bearer",
            "user": {"id": str(user_id)},
        }

        response = self.client.post(
            reverse("hospital-login"),
            data=json.dumps({"email": owner.email, "password": "password123"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload["hospital_id"], hospital.id)
        self.assertEqual(payload["access_token"], "token-1")
