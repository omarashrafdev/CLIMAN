from django.db import models
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import AbstractUser, BaseUserManager
from .data.choices import Status, Gender, Role, City


class UserManager(BaseUserManager):
    def _create_user(self, email, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, is_staff=is_staff, is_superuser=is_superuser, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, **extra_fields):
        return self._create_user(email, password, False, False, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    username = None
    # Identify Information
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
    role = models.CharField(max_length=1, choices=Role.choices, default=Role.ADMIN)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    status = models.CharField(max_length=1, choices=Status.choices, default=Status.NEW)
    date_joined = models.DateTimeField(auto_now_add=True)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()
