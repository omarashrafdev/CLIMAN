from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMessage  
from climan import settings

from .data.choices import Status, Gender, Role, City


class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, is_staff=is_staff, is_superuser=is_superuser, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return email

    def create_user(self, email, password, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    username = None
    # Identify Information
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField("Email Address", unique=True, blank=False, null=False)

    # Personal Information
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    gender = models.CharField(max_length=1, choices=Gender.choices, default=Gender.MALE)
    image = models.ImageField(null=True, blank=True, upload_to='images')
    phone = models.CharField(max_length=11, null=True, blank=True, unique=True)
    birthdate = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=300, choices=City.choices, default=City.CAIRO)

    # User Type
    role = models.CharField(max_length=1, choices=Role.choices, default=Role.DOCTOR)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    status = models.CharField(max_length=1, choices=Status.choices, default=Status.NEW)
    date_joined = models.DateTimeField(auto_now_add=True)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    @property
    def full_name(self):
        return '%s %s' % (self.first_name, self.last_name)


class EmailConfirmation(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    token = reset_password_token.key
    current_site = settings.FRONTEND_DOMAIN
    relative_url = '/forget-password'
    absolute_url = current_site+relative_url+'?token='+str(token)

    subject = 'Reset your password'
    message = f'Dear {reset_password_token.user.full_name},\n\nClick on the link below to reset your password.\n{absolute_url}\n\nCLIMAN Team\n2023'
    msg = EmailMessage(subject, message, to=[reset_password_token.user.email])
    msg.send()