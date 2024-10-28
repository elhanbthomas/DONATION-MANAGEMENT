from django.http import HttpResponse
# from .models import   BeneficiaryRequest
# from .serializer import BeneficiaryRequestSerializer
from rest_framework.views import APIView
from rest_framework import generics,status
from rest_framework.response import Response

# Create your views here.
def donor_view(*args,**kwargs):
    return HttpResponse("<h1>Donor Page View<h1>")

# class BeneficiaryRequestCreate(generics.ListCreateAPIView):
#     queryset =  BeneficiaryRequest.objects.all()
#     serializer_class =  BeneficiaryRequestSerializer

# class BeneficiaryRequestUpdate(generics.RetrieveUpdateDestroyAPIView):
#     queryset = BeneficiaryRequest.objects.all()
#     serializer_class = BeneficiaryRequestSerializer
#     lookup_field  = "pk"

# class BeneficiaryRequestList(APIView):
#     def get(self, request,format = None):
#         name= request.query_params.get("name", "")

#         if name:
#             requests = BeneficiaryRequest.objects.filter(name__icontains = name) #icontains = case insensitive
#         else:
#             requests = BeneficiaryRequest.objects.all()
#         serializer = BeneficiaryRequestSerializer(requests, many =True)
#         return Response(serializer.data, status = status.HTTP_200_OK)



    