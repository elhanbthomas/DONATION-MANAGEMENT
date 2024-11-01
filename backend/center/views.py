from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.permissions import IsStaffUser

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
@permission_classes([IsStaffUser])
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



from .serializers import GetVolunteerPickupSerializer, ItemPickupSerializer, VolunteerListSerializer, InventoryListSerializer, CenterListSerializer
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
@permission_classes([IsStaffUser])
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
@permission_classes([IsStaffUser])
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
@permission_classes([IsStaffUser])
def inventory_list(request):
    
    volunteer = Volounteer.objects.get(user=request.user)
    center = volunteer.Center_id
    
    try:
        inventory = Inventory.objects.filter(center=center)
        serializer = InventoryListSerializer(inventory, many=True)
        return Response(serializer.data, status=200)
    except Inventory.DoesNotExist:
        return Response({'error': 'inventory not found'}, status=404)
    
@api_view(['GET'])
@permission_classes([AllowAny])
def center_list(request):
    
    centers = Center.objects.all()
    serializer = CenterListSerializer(centers, many=True)
    return Response(serializer.data, status=200)
#-------------------------CENTER VIEWS ------------------------------------------------------------------
from .models import CenterRequest,CenterShipping
from .serializers import CenterRequestSerializer,CenterRequestCreateSerializer,CenterShippingSerializer,CenterReceiveSerializer

@api_view(['POST'])
@permission_classes([IsStaffUser])
def create_request(request):
    serializer = CenterRequestCreateSerializer(data=request.data, context={'request': request}, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "Request Created"}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.db.models import Q

@api_view(['GET'])
@permission_classes([IsStaffUser])
def list_other_center_requests(request):
    user = request.user
    try: 
        volunteer = Volounteer.objects.get(user=user)
        center = volunteer.Center_id 
        print(center)
        requests = CenterRequest.objects.exclude(Q(center=center) | Q(isShipped=True))
        serializer = CenterRequestSerializer(requests, many=True) 
        return Response(serializer.data, status=200)
    except Volounteer.DoesNotExist:
        return Response({'error':'list not found'},status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_request(request):
    request_id = request.data.get('req_id')
    volunteer = Volounteer.objects.get(user=request.user)
    center = volunteer.Center_id
    try:
        center_request = CenterRequest.objects.get(pk=request_id)
        center_request.isShipped = True
        center_request.save()
        
        shipping_data = {
        "from_center": center,
        "c_request": center_request
        }
        shipping_serializer = CenterShippingSerializer(data=shipping_data)
        if shipping_serializer.is_valid():
            shipping_serializer.save()
            return Response({"status": "Request Accepted, Shipment Created"}, status=status.HTTP_200_OK)
        else:
            return Response(shipping_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    except CenterRequest.DoesNotExist:
        return Response({'error':'request not found'},status=404)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_shipment_status(request, shipment_id):
    try:
        shipment = CenterShipping.objects.get(pk=shipment_id)
    except CenterShipping.DoesNotExist:
        return Response({"error": "Shipment not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CenterShippingSerializer(shipment, data={"in_transit": True}, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"status": "Shipment status updated to in transit"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_received(request, shipment_id):
    try:
        shipment = CenterShipping.objects.get(pk=shipment_id, in_transit=True)
    except CenterShipping.DoesNotExist:
        return Response({"error": "Shipment not in transit or does not exist"}, status=status.HTTP_404_NOT_FOUND)

    receive_data = {
        "shipping": shipment.id,
        "timestamp": request.data.get("timestamp"),
        "received": True
    }
    receive_serializer = CenterReceiveSerializer(data=receive_data)
    if receive_serializer.is_valid():
        receive_serializer.save()
        shipment.in_transit = False 
        shipment.save()
        return Response({"status": "Shipment marked as received"}, status=status.HTTP_200_OK)
    return Response(receive_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

