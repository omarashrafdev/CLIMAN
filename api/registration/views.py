import jwt
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from verify_email.email_handler import send_verification_email
from django.conf import settings
from .utils import Util
from .models import User,Appointments
from .serializer import UserSerializer, UserRegisterSerializer, MyTokenObtainPairSerializer, ChangePasswordSerializer,AppointmentsSerializer



from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view



class UsersView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get_queryset(self):
        user_id = self.kwargs['pk']
        user_object = User.objects.filter(id=user_id)
        return user_object


class MyObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegisterSerializer


class AddInformationView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    lookup_field = 'pk'

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Information Updated successfully."})
        else:
            return Response({"message": "failed", "details": serializer.errors})


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("password")):
                return Response({"password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return Response(response)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailView(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
            user = User.objects.get(id=payload['user_id'])

            if user.status == 'N':
                user.status = 'V'
                user.save()
                return Response({'email': 'Account verified successfully.'}, status=status.HTTP_200_OK)

            return Response({'email': 'Account already verified.'}, status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Token Expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)





@csrf_exempt
@api_view(['GET'])
def get_notes(request, id):
    """
    Endpoint to retrieve all notes for a given patient.
    """
    # Get all notes associated with the patient's ID
    notes = Appointments.objects.filter(patient_id=id)
    
    # Serialize the data to JSON
    serializer = AppointmentsSerializer(notes, many=True)
    
    # Return the serialized data as a JSON response
    return Response({'notes': serializer.data})

@csrf_exempt
@api_view(['POST'])
def create_note(request, id):
    """
    Endpoint to create a new note for a given patient.
    """
    # Add the patient ID to the data
    data = request.data.copy()
    data['patient_id'] = id
    
    # Serialize the data and validate it
    serializer = AppointmentsSerializer(data=data)
    if serializer.is_valid():
        # Save the new note to the database
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['PUT'])
def update_note(request, id):
    """
    Endpoint to update an existing note for a given patient.
    """
    # Get the note to be updated
    note = get_object_or_404(Appointments, pk=id)
    
    # Update the note's data with the request data
    serializer = AppointmentsSerializer(note, data=request.data, partial=True)
    if serializer.is_valid():
        # Save the updated note to the database
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['DELETE'])
def delete_note(request, id):
    """
    Endpoint to delete an existing note for a given patient.
    """
    # Get the note to be deleted
    note = get_object_or_404(Appointments, pk=id)
    
    # Delete the note from the database
    note.delete()
    
    # Return a success message
    return Response({'message': 'Note deleted successfully.'})