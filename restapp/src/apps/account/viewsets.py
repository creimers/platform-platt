import django_filters

from django.contrib.gis.geos import Point
from django.contrib.gis.measure import Distance

from rest_framework import filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Account as User
from .serializers import UserPublicSerializer


class UsersFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = ['role', ]

    radius = django_filters.MethodFilter(action='apply_radius_filter')

    def apply_radius_filter(self, queryset, value):
        radius = value
        lat = float(self.data.get('lat'))
        lng = float(self.data.get('lng'))

        point = Point(lng, lat)
        queryset = queryset.filter(
            coords__distance_lte=(point, Distance(km=radius))
        )
        return queryset


class UsersViewset(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserPublicSerializer
    filter_class = UsersFilter

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)
