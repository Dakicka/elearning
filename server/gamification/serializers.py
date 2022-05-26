from rest_framework import serializers
from .models import WatchedLectures


class WatchedLecturesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchedLectures
        fields = 'xp', 'lecture', 'account'
