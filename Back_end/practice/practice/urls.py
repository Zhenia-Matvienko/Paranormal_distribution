"""
URL configuration for practice project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from distribution.views import StudyGroupListCreateAPIView, UserListCreateAPIView, \
    UserRetrieveUpdateDestroyAPIView, SubjectListCreateAPIView, GradeListCreateAPIView, \
    GradeRetrieveUpdateDestroyAPIView, GradesByStudentAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('drf-auth/', include('rest_framework.urls')),
    path('studygroups/', StudyGroupListCreateAPIView.as_view(), name='studygroup-list-create'),
    path('users/', UserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyAPIView.as_view(), name='user-retrieve-update-destroy'),
    path('subjects/', SubjectListCreateAPIView.as_view(), name='subject-list-create'),
    path('grades/', GradeListCreateAPIView.as_view(), name='grade-list-create'),
    path('grades/<int:pk>/', GradeRetrieveUpdateDestroyAPIView.as_view(), name='grade-retrieve-update-destroy'),
    path('grades/student/<int:student_id>/', GradesByStudentAPIView.as_view(), name='grades-by-student'),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
