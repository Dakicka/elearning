from django.urls import path
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('me', views.meView.as_view()),
    path('profile', views.profileView.as_view()),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout', TokenBlacklistView.as_view(), name='token_refresh'),
]
