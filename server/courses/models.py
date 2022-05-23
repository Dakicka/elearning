from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    thumbnail = models.ImageField(upload_to='course_thumbnails', blank=True)


class Lecture(models.Model):
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, related_name='lectures')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    video_url = models.URLField(blank=True)
    xp = models.IntegerField(default=20)
