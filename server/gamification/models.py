from django.db import models


class WatchedLectures(models.Model):
    account = models.ForeignKey('identity.Account', on_delete=models.CASCADE)
    lecture = models.ForeignKey('courses.Lecture', on_delete=models.CASCADE)
    watched_at = models.DateTimeField(auto_now_add=True)
    xp = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.account.username} watched {self.lecture.title} at {self.watched_at}'
