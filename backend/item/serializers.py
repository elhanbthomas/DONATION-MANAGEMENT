from rest_framework import serializers
from .models import ItemPickup

class PickupSerializer(serializers.ModelSerializer):
    d_name = serializers.CharField(source = 'donor_request.donor.name')
    item_type = serializers.CharField(source = 'donor_request.item_type')
    quantity = serializers.CharField(source = 'donor_request.quantity')
    image = serializers.ImageField(source = 'donor_request.image')
    
    class Meta:
        model = ItemPickup
        # fields = ['id', 'donor', 'description', 'timestamp']
        fields = '__all__'
        