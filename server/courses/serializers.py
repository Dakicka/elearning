from rest_framework import serializers
from .models import Course, Lecture


class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = 'id', 'title', 'description', 'video_url', 'xp'


class CourseSerializer(serializers.ModelSerializer):
    lectures = LectureSerializer(many=True)

    class Meta:
        model = Course
        fields = 'id', 'title', 'description', 'lectures'
