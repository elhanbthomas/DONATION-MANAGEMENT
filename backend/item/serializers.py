from rest_framework import serializers
from .models import ItemPickup, ItemType
from django.core.exceptions import ObjectDoesNotExist

class ItemPickupSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItemPickup
        fields = ['item_type', 'quantity', 'description', 'image', 'center']
    
    def create(self, validated_data):
        donor = self.context['request'].user
        
        request = ItemPickup.objects.create(
            donor = donor,
            **validated_data
        ) 
        return request

class GetPickupsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItemPickup
        fields = '__all__'