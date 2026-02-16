from django.urls import path

from . import views

urlpatterns = [
    path("auth/register/", views.register_staff, name="staff-register"),
    path("auth/login/", views.login_staff, name="staff-login"),
    path("dashboard/", views.dashboard_summary, name="staff-dashboard-summary"),
    path("search/directory/", views.search_directory, name="staff-search-directory"),
    path("schedule/", views.staff_schedule, name="staff-schedule"),
    path("recommendations/", views.staff_recommendations, name="staff-recommendations"),
    path("jobs/<int:job_id>/apply/", views.apply_for_job, name="apply-for-job"),
    path(
        "applications/<int:application_id>/withdraw/",
        views.withdraw_application,
        name="withdraw-application",
    ),
    path(
        "applications/<int:application_id>/approve/",
        views.approve_application,
        name="approve-application",
    ),
]
