from django.db import models


class Type(models.TextChoices):
    ADMIN = 'A'
    DOCTOR = 'D'
    PATIENT = 'P'

class Status(models.TextChoices):
    NEW = 'N'
    VERIFIED = 'V'
    ACTIVE = 'A'
    SUSPENDED = 'S'


class Gender(models.TextChoices):
    MALE = 'M'
    FEMALE = 'F'


class City(models.TextChoices):
    ALEXANDRIA = 'Alexandria'
    ASWAN = "Aswan"
    ASYUT = "Asyut"
    BEHEIRA = "Beheira"
    BENI_SUEF = "Beni Suef"
    CAIRO = "Cairo"
    DAKAHLIA = "Dakahlia"
    DAMIETTA = "Damietta"
    FAIYUM = "Faiyum"
    GHARBIA = "Gharbia"
    GIZA = "Giza"
    ISMAILIA = "Ismailia"
    KAFR_EL_SHEIKH = "Kafr El Sheikh"
    LUXOR = "Luxor"
    MATRUH = "Matruh"
    MINYA = "Minya"
    MONUFIA = "Monufia"
    NEW_VALLEY = "New Valley"
    NORTH_SINAI = "North Sinai"
    PORT_SAID = "Port Said"
    QALYUBIA = "Qalyubia "
    QENA = "Qena"
    RED_SEA = "Red Sea"
    SHARQIA = "Sharqia"
    SOHAG = "Sohag"
    SOUTH_SINAI = "South Sinai"
    SUEZ = "Suez"


class AppointmentStatus(models.TextChoices):
    Scheduled = 'S'
    Done = 'D'
    Canceled = 'C'
     