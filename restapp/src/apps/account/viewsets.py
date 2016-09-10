from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Account as User
from .serializers import UserPublicSerializer


class UsersViewset(viewsets.ReadOnlyModelViewSet):
    permission_classes = (IsAuthenticated, )
    serializer_class = UserPublicSerializer

    def get_queryset(self):
        return User.objects.exclude(id=self.request.user.id)
