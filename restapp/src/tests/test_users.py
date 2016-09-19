import pytest

from django.core.urlresolvers import reverse

from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance

from geopy.distance import distance

from .fixtures import rest_client, users


def test_users_list_GET_401(rest_client):
    """
    no unauthorized access
    """
    url = reverse('users-list')
    response = rest_client.get(url)
    assert response.status_code == 401


@pytest.mark.django_db
def test_users_list_GET_200(rest_client, users):
    """
    authenticated user can access user list
    """

    rest_client.force_authenticate(user=users[0])
    url = reverse('users-list')
    response = rest_client.get(url)

    assert response.status_code == 200
    assert len(response.data) > 0


@pytest.mark.django_db
def test_users_list_filter_level_GET_200(rest_client, users):
    """
    authenticated user can access user list and filter for level
    """

    rest_client.force_authenticate(user=users[0])
    url = reverse('users-list') + '?level=beginner'
    response = rest_client.get(url)

    assert response.status_code == 200
    for user in response.data:
        assert user['level'] == 'beginner'


@pytest.mark.django_db
def test_users_list_filter_radius_GET_200(rest_client, users):
    """
    authenticated user can access user list and filter by radius
    """
    lat = 53.5586
    lng = 9.7877
    radius = 50

    point = Point(lng, lat)

    rest_client.force_authenticate(user=users[0])
    url = reverse('users-list')
    url += '?radius=%s&lat=%s&lng=%s' % (radius, lat, lng)
    response = rest_client.get(url)

    assert response.status_code == 200
    for user in response.data:
        latitude = float(user['coords']['latitude'])
        longitude = float(user['coords']['longitude'])
        coords = Point(longitude, latitude)
        dist = distance(point, coords)
        assert dist.km <= radius


@pytest.mark.django_db
def test_account_GET_200(rest_client, users):
    rest_client.force_authenticate(user=users[0])
    url = reverse('profile')
    response = rest_client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_account_PUT_200(rest_client, users):
    user = users[0]
    rest_client.force_authenticate(user=user)
    url = reverse('profile')
    user_update = {}
    user_update['email'] = user.email
    user_update['first_name'] = user.first_name
    user_update['last_name'] = user.last_name
    user_update['username'] = user.username
    user_update['level'] = user.level
    user_update['location'] = 'Pinneberg'
    user_update['coords'] = {'latitude': 53.6463, 'longitude': 9.7961}
    response = rest_client.put(url, user_update, format="json")
    assert response.status_code == 200
