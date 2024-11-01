from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import VolunteerRegistrationSerializer, DonorRegistrationSerializer

@api_view(['POST'])
def registerVolunteer(request):
    serializer = VolunteerRegistrationSerializer(data = request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'Registration succesfull'}, status=status.HTTP_200_OK)
    return Response({'message':'Registration unsuccesfull','error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def registerDonor(request):
    serializer = DonorRegistrationSerializer(data = request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'Registrasion successfull'}, status=status.HTTP_200_OK)
    return Response({'message':'Registration unsuccessful','error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


from donor.models import Donor
from center.models import Volounteer
from .serializers import DonorDetailsSerializer, VolunteerDetailSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_details(request):
    donor = Donor.objects.filter(user=request.user).first()
    volunteer = Volounteer.objects.filter(user=request.user).first()
    
    if donor:
        serializer = DonorDetailsSerializer(donor)
        user_type = 'donor'
    elif volunteer:

        serializer = VolunteerDetailSerializer(volunteer)
        if request.user.is_superuser:
            user_type = 'super'
        else:
            user_type = 'volunteer'

    else:
        return Response({'message': 'Record not found'}, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({'user_details':serializer.data, 'user_type':user_type}, status=status.HTTP_200_OK)

