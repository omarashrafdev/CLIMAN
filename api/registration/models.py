from django.db import models, transaction
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import EmailMessage  
from climan import settings
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
from .data.choices import Status, Gender, Type, City


class UserManager(BaseUserManager):
    def _create_user(self, email, first_name, last_name, password, is_staff, is_superuser, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, is_staff=is_staff, is_superuser=is_superuser, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        user_information = UserInformation.objects.create(user=user, first_name=first_name, last_name=last_name)

        return user

    def create_user(self, email, first_name, last_name, password, **extra_fields):
        return self._create_user(email, first_name, last_name, password, False, False, **extra_fields)

    def create_superuser(self, email, first_name, last_name, password, **extra_fields):
        return self._create_user(email, first_name, last_name, password, True, True, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    username = None
    # Identify Information
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField("Email Address", unique=True, blank=False, null=False)

    first_name = None
    last_name = None
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()


class UserInformation(models.Model):
    # User foreign key to link the two models
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_information")
    
    # First name and last name
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    # Full name - Custom property
    @property
    def full_name(self):
        return '%s %s' % (self.first_name, self.last_name)

    # Gender [M,F]
    gender = models.CharField(max_length=1, choices=Gender.choices)

    # Profile picture
    image = models.ImageField(null=True, blank=True, upload_to='images')

    # Phone regular expression
    phone_regex = RegexValidator(regex=r'^\+20\d{9,15}$', message="Phone number must be entered in the format: '+20123456789'. Up to 15 digits allowed.")
    # Phone number
    phone = models.CharField(validators=[phone_regex], max_length=17, blank=True)

    # Register date - When the user registered to the system
    register_date = models.DateField(auto_now_add=True)

    # Birthdate
    birthdate = models.DateField(blank=True, null=True)

    # Location Information
    address = models.CharField(max_length=300, blank=True, null=True)
    city = models.CharField(max_length=300, choices=City.choices)

    # Patients (If doctor)
    #patients = models.ForeignKey(User, on_delete=models.PROTECT, related_name="patient")
    patients = models.ManyToManyField(User, related_name="patient")

    # User type [D,P]
    type = models.CharField(max_length=1, choices=Type.choices)

    # User current status [N,V,S]
    status = models.CharField(max_length=1, choices=Status.choices, default=Status.NEW)

    # Set object name to email
    def __str__(self):
        return '-> ' + str(self.user)
    

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


# @receiver(post_save, sender=User)
# def create_user_information(sender, instance, created, **kwargs):
#     if created:
#         UserInformation.objects.get_or_create(user=instance)
