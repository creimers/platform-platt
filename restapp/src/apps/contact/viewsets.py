from django.db.models import Q

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    serializer_class = ContactSerializer

    def get_queryset(self):
        queryset = Contact.objects.filter(
            Q(sender=self.request.user) | Q(receiver=self.request.user)
        )
        return queryset

    def create(self, request, *args, **kwargs):
        request.data['sender'] = request.user.id
        return super(ContactViewSet, self).create(request, *args, **kwargs)
