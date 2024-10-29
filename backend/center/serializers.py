from rest_framework import serializers

from .models import VolounteerPickup, Volounteer

class GetVolunteerPickupSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = VolounteerPickup
        fields = '__all__'
        