from django.contrib.auth.models import AbstractUser
from django.db import models


class Account(AbstractUser):
    ROLE_CHOICES = (
        ('learn', 'learn'),
        ('teach', 'teach')
    )
    role = models.CharField(max_length=5, choices=ROLE_CHOICES)
    location = models.CharField(max_length=255, blank=True, null=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    profile_image = models.ImageField(null=True, blank=True)
