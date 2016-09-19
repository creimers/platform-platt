from djoser.serializers import UserRegistrationSerializer

from drf_extra_fields.geo_fields import PointField

from rest_framework import serializers

from .models import Account


class UserSerializer(serializers.ModelSerializer):
    coords = PointField()

    class Meta:
        model = Account
        fields = (
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'level',
            'location',
            'coords',
            'personal_description'
        )


class UserRegisterSerializer(UserRegistrationSerializer):
    coords = PointField()

    class Meta:
        model = Account
        fields = (
            'email',
            'level',
            'location',
            'coords',
            'password'
        )
