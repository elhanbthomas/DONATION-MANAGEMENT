from rest_framework import serializers
from .models import ItemPickup, ItemType
from django.core.exceptions import ObjectDoesNotExist

class PickupSerializer(serializers.ModelSerializer):
    d_name = serializers.CharField(source = 'donor_request.donor.name')
    item_type = serializers.CharField(source = 'donor_request.item_type')
    quantity = serializers.CharField(source = 'donor_request.quantity')
    image = serializers.ImageField(source = 'donor_request.image')
    
    class Meta:
        model = ItemPickup
        fields = '__all__'

from donor.models import Donor

class DonorRequestSerializer(serializers.ModelSerializer):
    type = serializers.CharField()
    
    class Meta:
        model = ItemPickup
        fields = ['type', 'description', 'quantity', 'image']
        
    def create(self, validated_data):
        
        try:
            item_type = ItemType.objects.get(name=validated_data['type'])
            
        except ItemPickup.DoesNotExist:
            raise serializers.ValidationError({'type':'Item type does not exist'})
        
        user = self.context['request'].user
        
        try:
            donor = Donor.objects.get(user=user)
        except Donor.DoesNotExist:
            raise serializers.ValidationError({'acccount':'Account not found'})
        
        donor_request = ItemPickup.objects.create(
            item_type = item_type,
            description = validated_data['description'],
            quantity = validated_data['quantity'],
            image = validated_data['image'],
            donor = donor
        )    
        return donor_request    