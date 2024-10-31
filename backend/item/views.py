from django.shortcuts import render
from django.contrib.auth.models import User
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
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


