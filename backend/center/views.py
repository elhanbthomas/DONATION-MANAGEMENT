from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from item.models import ItemPickup, ItemReceive
from .models import VolounteerPickup, Volounteer, Inventory, Center

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
            donation.forPickup = True
            donation.save()
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



from .serializers import GetVolunteerPickupSerializer, ItemPickupSerializer, VolunteerListSerializer, InventoryListSerializer
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_pickup_status(request):
    pk = request.data.get('id')
    isPicked = request.data.get('isPicked')
    isReceived = request.data.get('isReceived')
    user = request.user
    print(user)
    try:
        volunteer = Volounteer.objects.get(user=user)
        print(volunteer)
        try:
            pickup = VolounteerPickup.objects.get(volunteer=volunteer,pk=pk)
            item_pickup = pickup.pickup_id
            if isPicked:
                pickup.isPicked = isPicked
                pickup.save()
                item_pickup.isPicked = isPicked
                item_pickup.save()
            if isReceived:
                pickup.isReceived = isReceived
                pickup.save()
                item_pickup.isAccepted = isReceived
                item_pickup.save()
                item_receive = ItemReceive.objects.create(
                    Volounteer_id = volunteer,
                    center = volunteer.Center_id,
                    pickup = item_pickup
                )
                
                if item_receive:
                    count = Inventory.objects.count()
                    i_id = str(volunteer.Center_id) + ': ' + str(count+1)
                    inventory, created = Inventory.objects.get_or_create(
                        center = volunteer.Center_id,
                        item_type = item_pickup.item_type,
                        defaults= {'inventory_id':i_id,'quantity':item_pickup.quantity}
                    )
                    
                    if not created:
                        quantity = inventory.quantity
                        inventory.quantity = quantity + item_pickup.quantity
                        inventory.save()
                        return Response({'message': 'Inventory updated'},status=200)
                    
                    return Response({'message': 'Inventory created'})
                
            return Response({'message': 'status updated'})
        
        except VolounteerPickup.DoesNotExist:
            return Response({'error':'pickup not found'},status=status.HTTP_404_NOT_FOUND) 
    except Volounteer.DoesNotExist:
        return Response({'error':'volunteer not found'},status=status.HTTP_404_NOT_FOUND)
    
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def showDonorRequests(request):
    
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



@api_view(['POST'])
@permission_classes([IsAdminUser])
def direct_receive(request):        # donation acepted directly from center
    volunteer = Volounteer.objects.get(user=request.user)
    pickup_id = request.data.get('request_id')
    isAccepted = request.data.get('isAccepted')
    try:
        donor_request = ItemPickup.objects.get(pk=pickup_id)
        donor_request.isAccepted = isAccepted
        donor_request.isPicked = isAccepted
        donor_request.save()
        
        item_receive = ItemReceive.objects.create(
            pickup = donor_request,
            center = volunteer.Center_id
        )
        
        if item_receive:
            count = Inventory.objects.count()
            i_id = str(volunteer.Center_id) + ': ' + str(count+1)
            inventory, created = Inventory.objects.get_or_create(
                center = volunteer.Center_id,
                item_type = donor_request.item_type,
                defaults= {'inventory_id':i_id,'quantity':donor_request.quantity}
            )
            
            if not created:
                quantity = inventory.quantity
                inventory.quantity = quantity + donor_request.quantity
                inventory.save()
                return Response({'message': 'Inventory updated'},status=200)

            return Response({'message': 'Inventory created'})
        
        return Response({'message': 'status updated'})
    
    except ItemPickup.DoesNotExist:
        return Response({'error':'record not found'},status=404)

# ------------------------------LISTS---------------------------------------------------------

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def volunteer_list(request):
    try:
        user = Volounteer.objects.get(user=request.user)
        print(user.Center_id)
        center = Center.objects.get(pk=user.Center_id.pk)
        volunteers = Volounteer.objects.filter(Center_id=center, user__is_superuser = False)
        serializer = VolunteerListSerializer(volunteers, many=True)
        return Response(serializer.data, status=200)
    except Volounteer.DoesNotExist:
        return Response({'error': 'list not found'},status=404)
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def inventory_list(request):
    
    volunteer = Volounteer.objects.get(user=request.user)
    center = volunteer.Center_id
    
    try:
        inventory = Inventory.objects.filter(center=center)
        serializer = InventoryListSerializer(inventory, many=True)
        return Response(serializer.data, status=200)
    except Inventory.DoesNotExist:
        return Response({'error': 'inventory not found'}, status=404)
    
