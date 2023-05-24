from django.contrib import admin

from .models import StudyGroup, CustomUser, Subject, Grade

admin.site.register(StudyGroup)
admin.site.register(CustomUser)
admin.site.register(Subject)
admin.site.register(Grade)