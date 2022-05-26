from django.urls import path

from . import views

urlpatterns = [
    path('watch', views.watch, name='watch'),
]
