from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('', views.getRoutes),
    path('me', views.me),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('login/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
