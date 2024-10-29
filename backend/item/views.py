from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# from .models import ItemPickup
from .serializers import ItemPickupSerializer, ItemPickup

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def item_pickup(request):
    if request.method == 'POST':
        serializer = ItemPickupSerializer(data=request.data, context={'request':request})
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Donation registered'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def showDonorRequests(request):
    from center.models import Volounteer
    from donor.models import Donor
    if request.user.is_superuser:
        try:
            
            user = Volounteer.objects.get(user=request.user)
            print(user)
            center = user.Center_id
            items = ItemPickup.objects.filter(center=center)
            serializer = ItemPickupSerializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Volounteer.DoesNotExist:
            print('volunteer not found')
            return Response({'error': 'Unable to get request'}, status=status.HTTP_404_NOT_FOUND)
    
    else:
        try:
            user = Donor.objects.get(user=request.user)
            items = ItemPickup.objects.filter(donor=user)
            serializer = ItemPickupSerializer(items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        except Donor.DoesNotExist:
            print('donor not found')
            return Response({'error': 'Unable to get request'}, status=status.HTTP_404_NOT_FOUND)