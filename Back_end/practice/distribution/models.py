from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import MinValueValidator, MaxValueValidator


class StudyGroup(models.Model):
    study_group_name = models.CharField(max_length=23)

    def __str__(self):
        return self.study_group_name


class CustomUser(AbstractUser):
    study_group = models.ForeignKey(StudyGroup, on_delete=models.CASCADE, blank=True, null=True)
    groups = models.ManyToManyField(Group, related_name='custom_users')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_users')


class Subject(models.Model):
    subject_name = models.CharField(max_length=100)
    is_private = models.BooleanField(default=False)
    accept_grades = models.BooleanField(default=False)

    def __str__(self):
        return self.subject_name


class Grade(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    student_grades = models.IntegerField(validators=[MinValueValidator(60), MaxValueValidator(100)])

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['student', 'subject'], name='unique_student_subject')
        ]
