from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated, )
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
