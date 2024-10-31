from rest_framework import serializers

from .models import VolounteerPickup, Volounteer, PhoneVolounteer, Inventory, Center
from item.models import ItemPickup, ItemType
from donor.models import Donor, PhoneDonor

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