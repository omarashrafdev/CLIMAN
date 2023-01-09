from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User
from climan import settings


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['gender'] = user.gender
        token['email'] = user.email
        token['status'] = user.status
        if user.image:
            token['image'] = user.image.url
        token['is_superuser'] = user.is_superuser
        return token


class UserRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(
        required=settings.ACCOUNT_EMAIL_REQUIRED, 
        validators=[UniqueValidator(queryset=User.objects.all())]
        )
    first_name = serializers.CharField(required=True, write_only=True)
    last_name = serializers.CharField(required=True, write_only=True)

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name')
        extra_kwargs = {
            'email': {'required': True},
        }

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError(({"password": "Password fields didn't match."}))
        return data

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 
            'email', 
            'first_name', 
            'last_name', 
            'gender', 
            'birthdate', 
            'phone', 
            'address', 
            'city', 
            'role', 
            'status')
        read_only_fields = ('email', )