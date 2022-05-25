from cgitb import lookup
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Account, Profile
from .serializers import AccountSerializer, ProfileSerializer, RegistrationSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


@api_view(['GET'])
def getRoutes(request):
    routes = ["/api/courses/", "/api/identity/"]
    return Response(routes)


@permission_classes((IsAuthenticated,))
@api_view(['GET', 'PUT'])
def me(request):
    method = request.method
    account_instance = Account.objects.get(id=request.user.id)
    account_serializer = AccountSerializer(account_instance)
    profile_instance = Profile.objects.get(account=request.user.id)
    profile_serializer = ProfileSerializer(profile_instance)
    if method == 'GET':
        response = {
            "id": account_serializer.data["id"],
            "email": account_serializer.data["email"],
            "name": profile_serializer.data["name"],
            "avatar": profile_serializer.data["avatar"],
            "grade": profile_serializer.data["grade"],
            "xp": 1250}
        return Response(response)

    if method == 'PUT':
        profile_serializer.update(profile_instance, request.data)
        return Response({"account": account_serializer.data, "profile": profile_serializer.data})
    # return Response(profile_serializer.data + account_serializer.data)


@api_view(['POST'])
def login(request):
    email = request.data.get('email', None)
    password = request.data.get('password', None)
    account = Account.objects.get(email=email)
    if account is not None and account.check_password(password):
        profile = Profile.objects.get(account=account.id)
        profile_serializer = ProfileSerializer(profile)
        account_serializer = AccountSerializer(account)
        tokens = get_tokens_for_user(account)
        response = {
            "id": account_serializer.data["id"],
            "email": account_serializer.data["email"],
            "name": profile_serializer.data["name"],
            "avatar": profile_serializer.data["avatar"],
            "grade": profile_serializer.data["grade"],
            "accessToken": tokens['access'],
            "refreshToken": tokens['refresh']}
        return Response(response)
    return Response({"error": "Invalid Credentials"}, status=400)


@api_view(['POST'])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        account = serializer.save()
        profile = Profile.objects.create(
            account=account, email=account.email)
        profile_serializer = ProfileSerializer(profile)
        tokens = get_tokens_for_user(account)
        return Response({
            "id": account.id,
            "email": serializer.data["email"],
            "name": profile_serializer.data["name"],
            "avatar": profile_serializer.data["avatar"],
            "grade": profile_serializer.data["grade"],
            "accessToken": tokens['access'],
            "refreshToken": tokens['refresh']})
    return Response(serializer.errors)
