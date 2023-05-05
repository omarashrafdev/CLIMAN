from django.urls import path, include
from .views import UsersView, RegisterView, MyObtainTokenPairView, ChangePasswordView, VerifyEmailView, AddInformationView, UserView
from rest_framework_simplejwt.views import TokenRefreshView

# importing views to reduces cluster in the import section
from . import views


urlpatterns = [
    path('users', UsersView.as_view(), name='users-data'),
    path('user/<int:pk>', UserView.as_view(), name='user-data'),

    path('token', MyObtainTokenPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register', RegisterView.as_view(), name='register'),

    path('user/<int:pk>/add-information', AddInformationView.as_view(), name='add-information'),

    path('change-password', ChangePasswordView.as_view(), name='change-password'),
    path('password-reset/', include('django_rest_passwordreset.urls', namespace='password-reset')),

    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),


    # endpoints
    path('notes/<int:id>/', views.get_notes, name='get_notes'),
    path('notes/<int:id>/', views.create_note, name='create_note'),
    path('notes/<int:id>/', views.update_note, name='update_note'),
    path('notes/<int:id>/', views.delete_note, name='delete_note'),
]

