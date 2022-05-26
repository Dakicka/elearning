from rest_framework import generics, mixins
from .models import Course, Lecture
from .serializers import CourseSerializer, LectureSerializer


class CourseMixinView(
        mixins.ListModelMixin, mixins.RetrieveModelMixin, generics.GenericAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)


class LectureMixinView(
        mixins.RetrieveModelMixin, generics.GenericAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    lookup_field = 'id'

    def get(self, request, *args, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return self.retrieve(request, *args, **kwargs)
