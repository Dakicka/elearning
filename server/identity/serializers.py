from rest_framework import serializers
from .models import Profile, Account


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = 'name', 'avatar', 'grade', 'account'


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = 'email', 'password',
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        account = Account.objects.create_account(
            validated_data['email'], validated_data['password'])
        return account


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = 'email', 'id'
