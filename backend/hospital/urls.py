from django.urls import path

from . import views

urlpatterns = [
    path("auth/register/", views.register_hospital, name="hospital-register"),
    path("auth/login/", views.login_hospital, name="hospital-login"),
    path("meta/options/", views.meta_options, name="hospital-meta-options"),
    path("search/directory/", views.search_directory, name="hospital-search-directory"),
    path("shifts/summary/", views.shift_summary_list, name="shift-summary-list"),
    path("recommendations/", views.staff_recommendations_for_job, name="hospital-staff-recommendations"),
    path("shifts/<int:job_id>/manage/", views.shift_management_detail, name="shift-management-detail"),
    path("shifts/", views.create_job_posting, name="create-job-posting"),
    path(
        "applications/<int:application_id>/decision/",
        views.update_application_status,
        name="update-application-status",
    ),
    path("shifts/<int:job_id>/assign/", views.create_shift_assignment, name="create-shift-assignment"),
]
