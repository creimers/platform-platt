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


@pytest.mark.django_db
def test_contact_POST_201(rest_client, users):
    """
    post a new contact with existing users
    """
    sender = users[0]
    receiver = users[1]

    new_contact = {
        'sender': sender.id,
        'receiver': receiver.id,
        'message': "Justo Inceptos Porta Bibendum"
    }

    rest_client.force_authenticate(user=sender)
    url = reverse('contacts-list')
    response = rest_client.post(url, new_contact)
    assert response.status_code == 201


@pytest.mark.django_db
def test_contact_POST_400(rest_client, users):
    """
    post a new contact non with existing users
    """
    sender = users[0]

    new_contact = {
        'sender': sender.id,
        'receiver': 12000,
        'message': "Justo Inceptos Porta Bibendum"
    }

    rest_client.force_authenticate(user=sender)
    url = reverse('contacts-list')
    response = rest_client.post(url, new_contact)
    assert response.status_code == 400


def test_contact_GET_401(rest_client):
    """
    no unauthorized access
    """
    url = reverse('contacts-list')
    response = rest_client.get(url)
    assert response.status_code == 401


@pytest.mark.django_db
def test_contact_GET_200(rest_client, users):
    """
    get your contacts
    """
    sender = users[0]
    rest_client.force_authenticate(user=sender)
    url = reverse('contacts-list')
    response = rest_client.get(url)
    assert response.status_code == 200
