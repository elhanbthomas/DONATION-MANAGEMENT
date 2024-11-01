from rest_framework import serializers

from .models import VolounteerPickup, Volounteer, PhoneVolounteer, Inventory, Center
from item.models import ItemPickup, ItemType
from donor.models import Donor, PhoneDonor
from center.models import Center, CenterRequest,CenterShipping, CenterReceive

class DonorPhoneSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PhoneDonor
        fields = ['number']

class DonorSerializer(serializers.ModelSerializer):
    phone_numbers = DonorPhoneSerializer(many=True, source='phonedonor_set') 

    class Meta:
        model = Donor
        fields = ['name', 'email', 'district', 'city', 'pincode', 'address', 'latitude', 'longitude', 'phone_numbers']

class ItemTypeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItemType
        exclude = ['timestamp']

class ItemPickupSerializer(serializers.ModelSerializer):
    donor = DonorSerializer()
    item_type = ItemTypeSerializer()
    class Meta:
        model = ItemPickup
        exclude = ['center']

class GetVolunteerPickupSerializer(serializers.ModelSerializer):
    pickup_id = ItemPickupSerializer()
    class Meta:
        model = VolounteerPickup
        fields = ['id', 'pickup_id', 'assigned_time', 'isPicked', 'isReceived']


#----------------------------------------------------------------------------------------------------------
class VolunteerPhoneSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PhoneVolounteer
        fields = ['number']

class VolunteerListSerializer(serializers.ModelSerializer):
    phone = VolunteerPhoneSerializer(many=True, source='phonevolounteer_set')
    class Meta:
        model = Volounteer
        exclude = ['Center_id', 'user']



class InventoryListSerializer(serializers.ModelSerializer):
    item_type = ItemTypeSerializer()
    
    class Meta:
        model = Inventory
        exclude = ['center']


class CenterListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Center
        fields = '__all__'



class CenterRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CenterRequest
        fields = []

class CenterRequestCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CenterRequest
        fields = ['item_type', 'quantity']

    
    def create(self, validated_data):
        user = self.context['request'].user
        volunteer = Volounteer.objects.get(user=user)
        count = CenterRequest.objects.count()
        id = 'Req' + str(count+1)
        c_request = CenterRequest.objects.create(
            req_id = id,
            center = volunteer.Center_id,
            **validated_data
        )
        return c_request

class CenterShippingSerializer(serializers.ModelSerializer):
    fromCenter = Center
    toCenter = Center
    class Meta:
        model = CenterShipping
        fields = ['fromCenter' 'toCenter','fromAddress','toAdress','inTransit']

class CenterReceiveSerializer(serializers.ModelSerializer):
    ShippingID = CenterShipping
    class Meta:
        model = CenterReceive
        fields = ['ShippingID', 'timestamp', 'Received']

