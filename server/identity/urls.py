from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatters = [
    path('login', obtain_auth_token),
    path('register', obtain_auth_token),
    path('logout', obtain_auth_token),
]
