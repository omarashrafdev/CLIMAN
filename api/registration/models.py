import uuid
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.models import User
from registration.models import User
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMessage
from climan import settings
import datetime
from .data.choices import Status, Gender, Type, City, AppointmentStatus


class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, is_staff=is_staff,
                          is_superuser=is_superuser, **extra_fields)
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
    email = models.EmailField(
        "Email Address", unique=True, blank=False, null=False)

    # Personal Information
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    gender = models.CharField(
        max_length=1, choices=Gender.choices, default=Gender.MALE)
    image = models.ImageField(null=True, blank=True, upload_to='images')
    phone = models.CharField(max_length=11, null=True, blank=True, unique=True)
    birthdate = models.DateField(null=True, blank=True)
    address = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(
        max_length=300, choices=City.choices, default=City.CAIRO)

    # User Type
    type = models.CharField(
        max_length=1, choices=Type.choices, default=Type.DOCTOR)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    status = models.CharField(
        max_length=1, choices=Status.choices, default=Status.NEW)
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


class Appointments(models.Model):
    # The primary key for the Appointments model
    # is a UUID field that is generated automatically.
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    # The foreign key field that references the User model
    # and represents the doctor who will be seeing the patient.
    doctor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='doctor_appointments')

    # The foreign key field that references the User model
    # and represents the patient who has scheduled the appointment.
    patient = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='patient_appointments')

    # A string field that stores the type of treatment or reason for the appointment.
    treatment = models.CharField(max_length=100)

    # A text field that stores any additional notes or details about the appointment.
    description = models.TextField()

    # A date field that stores the date of the appointment.

    date = models.DateField(default=datetime.date.today)

    # A timestamp field that stores the time of day when the appointment is scheduled to occur.
    time = models.TimeField()

    # A string field that stores the current status of the appointment.
    # It has three possible values: 'SCHEDULED', 'DONE', or 'CANCELED'.
    status = models.CharField(max_length=1, choices = AppointmentStatus.choices, default=AppointmentStatus.Scheduled)


class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)


class Note(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='notes')
    doctor_id = models.IntegerField()
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
