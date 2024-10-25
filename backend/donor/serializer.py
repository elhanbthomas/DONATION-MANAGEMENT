from rest_framework import serializers
from .models import BeneficiaryRequest

class BeneficiaryRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeneficiaryRequest
        fields = ["name","phonenumber","email","address","pincode","items","quantity"]




    