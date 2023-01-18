from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from .tokens import AccountActivationTokenGenerator
'''
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from src.views.tokens import account_activation_token
from src.settings import FRONTEND_DOMAIN, BACKEND_DOMAIN
'''


def send_email_token(email, token):
    try:
        subject = 'CLIMAN - Verify your account'
        message = f'Thank you for registration in CLIMAN\nClick on the link below to verify your account\nhttp://127.0.0.1:8000/verify/{token}'
        service_email = EMAIL_HOST_USER
        recipient_list = [email, ]
        send_mail(subject, message, service_email, recipient_list)

    except Exception as e:
        return False

    return True


def send_verification_email(user):
    mail_subject = 'Activate your account.'
    message = f'Dear {user.full_name}, verify your account\n{settings.BACKEND_DOMAIN}{AccountActivationTokenGenerator.make_token(user)}'
    send_mail(
        subject=mail_subject,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[user.email])