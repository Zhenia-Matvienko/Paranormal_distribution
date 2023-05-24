from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from .models import StudyGroup, CustomUser


class StudyGroupAdmin(admin.ModelAdmin):
    list_display = ('study_group_name',)


admin.site.register(StudyGroup, StudyGroupAdmin)


class CustomUserAdmin(DefaultUserAdmin):
    list_display = ('username', 'email', 'study_group')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Additional Info', {'fields': ('study_group',)}),
    )


admin.site.register(CustomUser, CustomUserAdmin)
