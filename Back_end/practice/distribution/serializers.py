from djoser.serializers import UserCreateSerializer as DjoserUserCreateSerializer, \
    UserSerializer as DjoserUserSerializer
from rest_framework import serializers
from .models import StudyGroup, CustomUser, Subject, Grade


class StudyGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyGroup
        fields = '__all__'


class UserCreateSerializer(DjoserUserCreateSerializer):
    study_group_id = serializers.PrimaryKeyRelatedField(queryset=StudyGroup.objects.all(), source='study_group')

    class Meta(DjoserUserCreateSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 'study_group_id')


class UserSerializer(DjoserUserSerializer):
    study_group = serializers.PrimaryKeyRelatedField(queryset=StudyGroup.objects.all(), allow_null=True, required=False)

    class Meta(DjoserUserSerializer.Meta):
        model = CustomUser
        fields = ('id', 'email', 'username', 'study_group')


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'
