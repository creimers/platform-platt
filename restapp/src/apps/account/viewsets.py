from rest_framework import filters
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Account as User
from .serializers import UserPublicSerializer


class UsersFilter(filters.FilterSet):
    class Meta:
        model = User
        fields = ['role', ]


class UsersViewset(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserPublicSerializer
    filter_class = UsersFilter

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)
