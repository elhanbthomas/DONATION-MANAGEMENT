from rest_framework import serializers
from .models import Beneficiary, BeneficiaryRequest, BeneficiaryShipment
from item.models import ItemType



class Requestserializer(serializers.ModelSerializer):
    
    class Meta:
        model = BeneficiaryRequest
        fields = ['item_type', 'quantity']

class BeneficiarySerializer(serializers.ModelSerializer):
    B_requests = Requestserializer(write_only = True, many = True)
    
    class Meta:
        model  = Beneficiary
        fields = ['name', 'email', 'phone', 'state', 'city', 'address', 'pincode', 'B_requests']
    
    def create(self, validated_data):
        request  = validated_data.pop('B_requests')
        
        b_count = Beneficiary.objects.count()
        id = 'B' + str(b_count+1)
        beneficiary = Beneficiary.objects.create(
            B_id = id,
            **validated_data
        )
        print(request)
        for req in request:
            BeneficiaryRequest.objects.create(
                beneficiary=beneficiary,
                item_type = req['item_type'],
                quantity = req['quantity']
            )
            
        return beneficiary
    
    
from center.serializers import ItemTypeSerializer

class BeneficiaryListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Beneficiary
        exclude = ['createdAt']
        
        
class ListBRequestSerializer(serializers.ModelSerializer):
    item_type = ItemTypeSerializer()
    beneficiary = BeneficiaryListSerializer()
    class Meta:
        model = BeneficiaryRequest
        fields = '__all__'
        
        
# class BeneficiaryShipmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = BeneficiaryShipment
#         fields = '__all__'