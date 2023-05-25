from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import StudyGroup, CustomUser, Subject, Grade
from .serializers import StudyGroupSerializer, UserSerializer, SubjectSerializer, GradeSerializer


class StudyGroupListCreateAPIView(generics.ListCreateAPIView):
    queryset = StudyGroup.objects.all()
    serializer_class = StudyGroupSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class SubjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class GradeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class GradeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class GradesByStudentAPIView(APIView):
    def get(self, request, student_id):
        grades = Grade.objects.filter(student=student_id)
        serializer = GradeSerializer(grades, many=True)
        return Response(serializer.data)