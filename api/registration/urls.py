from django.urls import path, include
from .views import UsersView, RegisterView, MyObtainTokenPairView, ChangePasswordView, VerifyEmailView


urlpatterns = [
    path('users', UsersView.as_view(), name='users'),

    path('token', MyObtainTokenPairView.as_view(), name='login'),
    path('register', RegisterView.as_view(), name='register'),

    path('change-password', ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
]

