from climan.settings import FRONTEND_DOMAIN, BACKEND_DOMAIN, EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, DEFAULT_FROM_EMAIL
from django.core.mail import EmailMessage
from datetime import datetime, timedelta


class Util:
    def send_verification_email(user, link):
        subject = 'Verify your account'
        message = f'Dear {user.first_name},\nThank you for registering in CLIMAN.\n\nClick on the link below to verify your account.\n{link}\nThe link is valid until {datetime.now() + timedelta(minutes=5)}\n\nCLIMAN Team\n2023'
        email = EmailMessage(subject, message, DEFAULT_FROM_EMAIL, to=[user.email])
        email.send()
