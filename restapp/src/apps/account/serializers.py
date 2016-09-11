from drf_extra_fields.geo_fields import PointField

from rest_framework import serializers

from .models import Account


class UserPrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'email',
            'username',
            'role',
            'coords',
            'location',
        )


class UserPublicSerializer(serializers.ModelSerializer):
    coords = PointField()

    class Meta:
        model = Account
        fields = (
            'email',
            'username',
            'role',
            'location',
            'lat',
            'lng',
            'coords'
        )
