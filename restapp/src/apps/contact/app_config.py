from django.apps import AppConfig


class ContactConfig(AppConfig):

    name = 'apps.contact'

    def ready(self):
        import apps.contact.signals
