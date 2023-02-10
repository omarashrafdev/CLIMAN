from django.urls import path, include
from .views import UsersView, RegisterView, MyObtainTokenPairView, ChangePasswordView, VerifyEmailView, AddInformationView, UserView


urlpatterns = [
    path('users', UsersView.as_view(), name='users-data'),
    path('user/<int:pk>', UserView.as_view(), name='user-data'),

    path('token', MyObtainTokenPairView.as_view(), name='login'),
    path('register', RegisterView.as_view(), name='register'),

    path('user/<int:pk>/add-information', AddInformationView.as_view(), name='add-information'),

    path('change-password', ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', include('django_rest_passwordreset.urls', namespace='password-reset')),

    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
]

