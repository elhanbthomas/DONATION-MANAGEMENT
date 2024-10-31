from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Donor
from .serializer import DonorRequestSerializer
from item.models import ItemPickup

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def donor_request_details(request):
    
    user = request.user
    try:
        donor = Donor.objects.get(user=user)
        items = ItemPickup.objects.filter(donor=donor)
        serializer = DonorRequestSerializer(items, many=True)
        return Response(serializer.data, status=200)
    except Donor.DoesNotExist:
        return Response({'error', serializer.errors},status=400)
    



    