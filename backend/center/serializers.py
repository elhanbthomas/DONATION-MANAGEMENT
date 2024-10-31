from rest_framework import serializers

from .models import VolounteerPickup, Volounteer
from item.models import ItemPickup, ItemType
from donor.models import Donor, PhoneDonor
from center.models import Center, CenterRequest

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
        fields = ['name', 'description']

class ItemPickupSerializer(serializers.ModelSerializer):
    donor = DonorSerializer()
    item_type = ItemTypeSerializer()
    class Meta:
        model = ItemPickup
        fields = ['item_type', 'quantity', 'description', 'image', 'requested_at', 'donor']

class GetVolunteerPickupSerializer(serializers.ModelSerializer):
    pickup_id = ItemPickupSerializer()
    class Meta:
        model = VolounteerPickup
        fields = ['id', 'pickup_id', 'assigned_time', 'isPicked', 'isReceived']


class CenterRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Center
        fields = [ 'name', 'email', 'isMain', 'City', 'State']

class CenterRequestSerializer(serializers.ModelSerializer):
    Center_id = CenterRegistrationSerializer()
    class Meta:
        model = CenterRequest
        fields = ['description', 'quantity', 'Center_id']

class CenterRequestCreateSerializer(serializers.ModelSerializer):
    Center_id = serializers.PrimaryKeyRelatedField(queryset=Center.objects.all())  # Use ID instead of full Center

    class Meta:
        model = CenterRequest
        fields = ['description', 'quantity', 'Center_id']