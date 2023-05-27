from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import StudyGroup, CustomUser, Subject, Grade
from .serializers import StudyGroupSerializer, UserSerializer, SubjectSerializer, GradeSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from social_django.utils import psa


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

    def perform_update(self, serializer):
        study_group_id = self.request.data.get('study_group', None)
        if study_group_id is not None:
            study_group = StudyGroup.objects.get(pk=study_group_id)
            serializer.save(study_group=study_group)
        else:
            serializer.save()


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


class NonPrivateSubjectsAPIView(APIView):
    def get(self, request):
        subjects = Subject.objects.filter(is_private=False)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)


class SubjectsAcceptingGradesAPIView(APIView):
    def get(self, request):
        subjects = Subject.objects.filter(accept_grades=True)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)


class GoogleLogin(APIView):
    permission_classes = [AllowAny]

    @psa()
    def post(self, request):
        # The `request.backend` object will contain the Google OAuth backend
        # You can use `request.backend.do_auth()` to authenticate the user
        # and perform any additional actions.

        # For example, you can create a new user or get the authenticated user.
        user = request.backend.do_auth(request.data.get('access_token'))
        if user:
            return Response({
                'status': 'success',
                'user_id': user.id,
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'failed',
                'message': 'Failed to authenticate with Google.',
            }, status=status.HTTP_401_UNAUTHORIZED)