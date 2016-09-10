import pytest
import random

from django.contrib.auth import get_user_model
from django.contrib.gis.geos import Point

from rest_framework.test import APIClient


User = get_user_model()


@pytest.fixture
def rest_client():
    return APIClient()


LOCATIONS = [
    {
        'lat': '53.6463',
        'lng': '9.7961',
        'name': 'Pinneberg'
    },
    {
        'lat': '53.7538',
        'lng': '9.6365',
        'name': 'Elmshorn'
    },
    {
        'lat': '53.5002',
        'lng': '9.7256',
        'name': 'Moorende'
    },
    {
        'lat': '54.3418',
        'lng': '10.0556',
        'name': 'Kiel'
    },
    {
        'lat': '53.5586',
        'lng': '9.7877',
        'name': 'Hamburg'
    },
    {
        'lat': '48.1550',
        'lng': '11.4017',
        'name': 'München'
    }
]


@pytest.fixture
@pytest.mark.django_db
def users():
    users = []
    for i, loc in enumerate(LOCATIONS):
        point = Point(float(loc['lng']), float(loc['lat']))
        user = User.objects.create(
            email="user%s@two.com" % i,
            username="user%s" % i,
            password="123",
            first_name="John %s" % i,
            last_name="Doe %s" % i,
            coords=point,
            location=loc['name'],
            role=random.choice(['teach', 'learn'])
        )
        users.append(user)
    return users
