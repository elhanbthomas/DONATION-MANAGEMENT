from rest_framework import serializers
from django.contrib.auth.models import User
from center.models import Volounteer, PhoneVolounteer
        
        
class PhoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhoneVolounteer
        fields = ['number']


class VolunteerSerializer(serializers.ModelSerializer):
    phone = PhoneSerializer(many=True)
    
    class Meta:
        model = Volounteer
        fields = ['name', 'email', 'city', 'house_no', 'phone', 'qualification', 'designation']
    

class VolunteerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    confirm_pass = serializers.CharField(write_only = True)
    profile = VolunteerSerializer(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'password', 'confirm_pass', 'profile']
    
    def validate(self, attrs):
        if len(attrs['password']) < 8:
            raise serializers.ValidationError('Passsword must be at least 8 characters long')
        if attrs['password'] != attrs['confirm_pass']:
            raise serializers.ValidationError('Passwords mismatch')
        return attrs
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        phone_number = profile_data.pop('phone')
        validated_data.pop('confirm_pass')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        
        vol = Volounteer.objects.all()
        id = 'V' + str(len(vol)+1)
        
        volunteer = Volounteer.objects.create(
            user=user,
            v_id = id,
            name = profile_data['name'],
            email = profile_data['email'],
            city = profile_data['city'],
            house_no = profile_data['house_no'],
            qualification = profile_data['qualification'],
            designation = profile_data['designation']
        )
        for num in phone_number:
            PhoneVolounteer.objects.create(volunteer=volunteer, **num)
        return user