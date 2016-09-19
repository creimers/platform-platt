from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.gis.db import models


class AccountManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
            **kwargs
        )

        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Account(AbstractUser):
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = AccountManager()

    ROLE_CHOICES = (
        ('learn', 'learn'),
        ('teach', 'teach')
    )
    LEVEL_CHOICES = (
        ('beginner', 'beginner'),
        ('intermediate', 'intermediate'),
        ('mothertongue', 'mothertongue')
    )
    role = models.CharField(max_length=5, choices=ROLE_CHOICES)
    level = models.CharField(
        max_length=12,
        choices=LEVEL_CHOICES,
        default='beginner'
    )
    location = models.CharField(max_length=255, blank=True, null=True)
    coords = models.PointField(null=True, blank=True)

    profile_image = models.ImageField(null=True, blank=True)
    personal_description = models.TextField(null=True)

Account._meta.get_field_by_name('email')[0]._unique = True
Account._meta.get_field_by_name('username')[0]._unique = False
