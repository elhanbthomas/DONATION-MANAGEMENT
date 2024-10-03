from rest_framework import serializers
from django.contrib.auth.models import User
from center.models import Volounteer

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    
    class Meta:
        model = User
        fields = ['username', 'password']
    
    def validate(attrs):
        if len(attrs['password']) < 8:
            raise serializers.ValidationError('Passsword must be at least 8 characters long')
        return attrs
    
    def create(validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user