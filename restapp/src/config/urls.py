"""art_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.contrib import admin

from djoser.views import (
    UserView,
    RegistrationView,
    ActivationView,
    PasswordResetView,
    PasswordResetConfirmView,
    SetPasswordView
)

from rest_framework.routers import DefaultRouter

from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token
)

from apps.account.viewsets import UsersViewset
from apps.contact.viewsets import ContactViewSet

API_ROOT = DefaultRouter()
API_ROOT.register(
    r'users', UsersViewset, base_name='users')
API_ROOT.register(
    r'contacts', ContactViewSet, base_name='contacts')

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    # djoser
    url(r'^v1/account/$', UserView.as_view(), name='profile'),
    url(r'^v1/register/$', RegistrationView.as_view(), name='register'),
    url(r'^v1/activate/$', ActivationView.as_view(), name='activate'),
    url(
        r'^v1/password/reset/$',
        PasswordResetView.as_view(),
        name='password_reset'
    ),
    url(
        r'^v1/password/reset/confirm/',
        PasswordResetConfirmView.as_view(),
        name='password_reset_confirm'
    ),

    # JWT
    url(r'^v1/authenticate/', obtain_jwt_token),
    url(r'^v1/reauthenticate/', refresh_jwt_token),
    url(r'^v1/verify-token/', verify_jwt_token),

    url(r'^v1/', include(API_ROOT.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
