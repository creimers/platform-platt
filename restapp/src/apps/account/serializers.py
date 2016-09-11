from drf_extra_fields.geo_fields import PointField

from rest_framework import serializers

from .models import Account


class UserSerializer(serializers.ModelSerializer):
    coords = PointField()

    class Meta:
        model = Account
        fields = (
            'email',
            'username',
            'role',
            'location',
            'coords',
            'personal_description'
        )
