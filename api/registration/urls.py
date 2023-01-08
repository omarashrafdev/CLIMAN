from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import UsersView, RegisterView, MyObtainTokenPairView


urlpatterns = [
    path('users', UsersView.as_view(), name='users'),
    path('login', MyObtainTokenPairView.as_view(), name='login'),
    path('register', RegisterView.as_view(), name='register'),
]

