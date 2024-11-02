from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from api.permissions import IsStaffUser
from item.models import ItemType
from center.models import Volounteer, Inventory
from .models import BeneficiaryRequest, BeneficiaryShipment

from .serializers import BeneficiarySerializer, ListBRequestSerializer

@api_view(['POST'])
def beneficiary_request(request):
    serializer = BeneficiarySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'request registered'}, status=status.HTTP_200_OK)
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsStaffUser])
def list_requests(request):
    req = BeneficiaryRequest.objects.filter(accepted_request = False)
    serializer = ListBRequestSerializer(req, many=True)
    return Response(serializer.data, status=200)
    
    
@api_view(['POST'])
@permission_classes([IsStaffUser])
def accept_beneficiary_request(request):
   
    request_id = request.data.get('request_id')
    volunteer_user = request.user  
    

    try:
        volunteer = Volounteer.objects.get(user=volunteer_user)
    except Volounteer.DoesNotExist:
        return Response({'error': 'Volunteer not found for this user'}, status=status.HTTP_404_NOT_FOUND)
    

    try:
        beneficiary_request = BeneficiaryRequest.objects.get(pk=request_id, accepted_request=False)
        beneficiary_request.accepted_request = True
        beneficiary_request.save()
        
        center = volunteer.Center_id 
        item_type = beneficiary_request.item_type
        quantity_requested = beneficiary_request.quantity
    
        try:
            inventory = Inventory.objects.get(
                center=center,
                item_type=item_type,
            )
            if inventory.quantity >= quantity_requested:
                inventory.quantity -= quantity_requested
                inventory.save()
                return Response({'message': 'Beneficiary shipment created and inventory updated'}, status=status.HTTP_200_OK)
        
        except Inventory.DoesNotExist:
            return Response({'error': 'Inventory not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except BeneficiaryRequest.DoesNotExist:
        return Response({'error': 'Beneficiary request not found'}, status=status.HTTP_404_NOT_FOUND)

    # beneficiary_shipment = BeneficiaryShipment.objects.create(
    #     BR_id=beneficiary_request,
    

# @api_view(['GET'])
# @permission_classes([IsStaffUser])
# def assign_volunteer(request):
#     v_id = request.data.get('v_id')
#     req_id = request.data.get('req_id')
    
#     try:
#         volunteer = Volounteer.objects.get(pk=v_id)
#         shipment = BeneficiaryShipment.objects.get(pk=req_id)
#         shipment.V_id = volunteer
#         shipment.save()
#         return Response({'message': 'Volunteer assigned'},status=200)
#     except Volounteer.DoesNotExist:
#         return Response({'error':'invalid details'}, status=404)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_beneficiery_shipment(request):
#     volunteer = Volounteer.objects.get(user=request.user)
#     shipment = BeneficiaryShipment.objects.filter(V_id=volunteer)
#     serializer = BeneficiaryShipmentSerializer(shipment)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def update_is_delivered(request):
#     bship_id = request.data.get('bship_id')
    
#     try:
#         shipment = BeneficiaryShipment.objects.get(pk=bship_id)
        
#         shipment.isDelivered = True
#         shipment.save()        
    
#     except BeneficiaryShipment.DoesNotExist:
#         return Response({'error': 'Shipment not found'}, status=status.HTTP_404_NOT_FOUND)