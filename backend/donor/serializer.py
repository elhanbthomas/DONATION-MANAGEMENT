from rest_framework import serializers
from .models import BeneficiaryRequest

class BeneficiaryRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeneficiaryRequest
        fields = ["name","phone","email","adress","pincode","items","quantity"]




    