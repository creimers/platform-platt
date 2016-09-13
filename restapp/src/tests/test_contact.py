import pytest

from django.core.urlresolvers import reverse

from .fixtures import rest_client, users


def test_contact_POST_401(rest_client):
    """
    no unauthorized access
    """
    url = reverse('contacts-list')
    response = rest_client.post(url)
    assert response.status_code == 401
