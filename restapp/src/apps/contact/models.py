from django.db import models
from apps.account.models import Account


class Contact(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(Account, related_name='sent_requests')
    receiver = models.ForeignKey(Account, related_name='received_requests')
    message = models.TextField()

    def __str__(self):
        return ' '.join([self.sender.email, '-->', self.receiver.email])
