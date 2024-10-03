from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import VolunteerRegistrationSerializer

@api_view(['POST'])
def registerVolunteer(request):
    serializer = VolunteerRegistrationSerializer(data = request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'Registration succesfull'}, status=status.HTTP_200_OK)
    return Response({'message':'Registration unsuccesfull','error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)