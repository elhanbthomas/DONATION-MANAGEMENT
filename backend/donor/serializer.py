from rest_framework import serializers

from item.models import ItemPickup
class DonorRequestSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ItemPickup
        exclude = ['donor']