from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from item.models import ItemPickup
from .models import VolounteerPickup

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def pickup_request(request):
    from donor.models import Donor
    
    request_id = request.data.get('id')
    try:
        donor = Donor.objects.get(user=request.user)
        
        try:
            donation = ItemPickup.objects.get(donor=donor, id=request_id)
            volunteer_pickup = VolounteerPickup.objects.create(
                pickup_id = donation
            )
            return Response({'message':'request send'}, status=status.HTTP_200_OK)
        except ItemPickup.DoesNotExist:
            return Response({'error': 'Request not found'}, status=status.HTTP_404_NOT_FOUND)
        
    except Donor.DoesNotExist:
        return Response({'error':'user not found'},status=status.HTTP_404_NOT_FOUND)
    
    # return Response({'error': 'Bad request'}, ststus=status.HTTP_400_BAD_REQUEST)
