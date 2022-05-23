from django.urls import path
from . import views

# /api/courses
urlpatterns = [
    path('', views.CourseMixinView.as_view()),
    path('<int:id>', views.CourseMixinView.as_view()),
    path('lectures/<int:id>', views.LectureMixinView.as_view()),

]
