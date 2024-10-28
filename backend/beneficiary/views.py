from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from item.models import ItemType

from .serializers import BeneficiarySerializer
@api_view(['POST'])
def beneficiary_request(request):
    # type = ItemType.objects.filter(type_id='T01')
    # for i in type:
    #     print(i.description)
    serializer = BeneficiarySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message':'request registered'}, status=status.HTTP_200_OK)
    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
