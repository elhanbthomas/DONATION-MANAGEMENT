from rest_framework import serializers
from .models import ItemPickup, ItemType, Donor
from django.core.exceptions import ObjectDoesNotExist

class ItemPickupSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItemPickup
        fields = ['item_type', 'quantity', 'description', 'image', 'center']
    
    def create(self, validated_data):
        user = self.context['request'].user
        donor = Donor.objects.get(user=user)
        request = ItemPickup.objects.create(
            donor = donor,
            **validated_data
        ) 
        return request

