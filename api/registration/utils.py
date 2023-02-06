from climan.settings import FRONTEND_DOMAIN, BACKEND_DOMAIN, EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD
from django.core.mail import EmailMessage
from datetime import datetime, timedelta


class Util:
    def send_verification_email(user, link):
        subject = 'Verify your account'
        message = f'Dear {user.full_name},\nThank you for registering in CLIMAN.\n\nClick on the link below to verify your account.\n{link}\nThe link is valid until {datetime.now() + timedelta(minutes=5)}\n\nCLIMAN Team\n2023'
        msg = EmailMessage(subject, message, to=[user.email])
        msg.send()

        
