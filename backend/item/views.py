from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import ItemPickup
from .serializers import PickupSerializer

@api_view(['GET'])
def pickupList(request):
    
    try:
        list = ItemPickup.objects.all()
        serializer = PickupSerializer(list, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except ObjectDoesNotExist:
        return Response({'error':'Error item not found'}, status=status.HTTP_400_BAD_REQUEST)