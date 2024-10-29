from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from item.models import ItemPickup
from .models import VolounteerPickup, Volounteer

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
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def assign_volunteer(request):
  
    vol_id = request.data.get('vol_id')
    pickup_id = request.data.get('pickup_id')
    try:
        volunteer = Volounteer.objects.get(v_id=vol_id)
        try:
            pickup = VolounteerPickup.objects.get(id=pickup_id)
            pickup.volunteer = volunteer
            pickup.save()
            return Response({'message': 'volunteer assigned'},status=status.HTTP_200_OK)
        except VolounteerPickup.DoesNotExist:
            return Response({'error': 'pickup not found'}, status=status.HTTP_404_NOT_FOUND)
    except Volounteer.DoesNotExist:
        return Response({'error':'volunteer does not exist'},status=status.HTTP_404_NOT_FOUND)



from .serializers import GetVolunteerPickupSerializer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def pickupDetails(request):
    try:
        
        volunteer = Volounteer.objects.get(user=request.user)
        volunteer_pickups = VolounteerPickup.objects.filter(volunteer=volunteer)
        
        serializer = GetVolunteerPickupSerializer(volunteer_pickups, many=True)
        
        return Response(serializer.data, status=200)
    
    except Volounteer.DoesNotExist:
        return Response({'error': 'Volunteer not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
        