from django.core.mail import EmailMessage
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.template.loader import render_to_string

from .models import Contact


@receiver(post_save, sender=Contact, dispatch_uid="contact")
def send_contact_email(sender, instance, **kwargs):
    template = 'contact_email.txt'
    content = render_to_string(
        template,
        {
            "receiver": instance.receiver,
            "sender": instance.sender,
            "message": instance.message,
        }
    )

    subject = "Neue Kontaktanfrage über plattform-platt.de"

    email = EmailMessage(
        subject,
        content,
        'info@plattform-platt.de',
        [instance.receiver.email, ]
    )
    email.send()
