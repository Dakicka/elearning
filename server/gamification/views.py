from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from identity.models import Account
from .serializers import WatchedLecturesSerializer
from .models import WatchedLectures
from courses.models import Lecture


class WatchedLecturesView(CreateAPIView):
    serializer_class = WatchedLecturesSerializer

    def get(self, request):
        watched_lectures = WatchedLectures.objects.all()
        serializer = WatchedLecturesSerializer(watched_lectures, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data

        account = Account.objects.get(id=request.user.id)
        lecture = Lecture.objects.get(id=data['id'])
        request.data['account'] = account
        request.data['lecture'] = lecture
        request.data['xp'] = lecture.xp
        serializer = WatchedLecturesSerializer(data=request.data)
        print(serializer)

        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated, ])
def watch(request):
    method = request.method
    if method == 'POST':
        lectureId = request.data.get('id')
        account = Account.objects.get(id=request.user.id)
        lecture = Lecture.objects.get(id=lectureId)
        xp = lecture.xp
        if not WatchedLectures.objects.filter(account=account, lecture=lecture).exists():
            WatchedLectures.objects.create(
                account=account, lecture=lecture, xp=xp)
            return Response({'message': 'Lecture watched'}, status=status.HTTP_201_CREATED)
        return Response({'message': 'Lecture already watched'}, status=status.HTTP_208_ALREADY_REPORTED)
