from cgitb import lookup
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, mixins
from .models import Account, Profile
from .serializers import AccountSerializer, ProfileSerializer, RegistrationSerializer


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
        return Response({"account": account_serializer.data, "profile": profile_serializer.data})

    if method == 'PUT':
        profile_serializer.update(profile_instance, request.data)
        return Response({"account": account_serializer.data, "profile": profile_serializer.data})
    # return Response(profile_serializer.data + account_serializer.data)


@api_view(['POST'])
def register(request):
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        account = serializer.save()
        profile = Profile.objects.create(
            account=account, email=account.email)
        profile_serializer = ProfileSerializer(profile)
        return Response(profile_serializer.data)
    return Response(serializer.errors)
