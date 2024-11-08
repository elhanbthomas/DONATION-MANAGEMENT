from rest_framework import serializers

from item.models import ItemPickup
from center.serializers import ItemTypeSerializer, CenterListSerializer

class DonorRequestSerializer(serializers.ModelSerializer):
    item_type = ItemTypeSerializer()
    center = CenterListSerializer()
    class Meta:
        model = ItemPickup
        exclude = ['donor']