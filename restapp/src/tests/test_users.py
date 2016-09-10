import pytest

from django.core.urlresolvers import reverse

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
def test_users_list_filter_role_GET_200(rest_client, users):
    """
    authenticated user can access user list and filter for role
    """

    rest_client.force_authenticate(user=users[0])
    url = reverse('users-list') + '?role=learn'
    response = rest_client.get(url)

    assert response.status_code == 200
    for user in response.data:
        assert user['role'] == 'learn'
