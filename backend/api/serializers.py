from rest_framework import serializers
from django.contrib.auth.models import User
from center.models import Volounteer, PhoneVolounteer, Center
        
# -------------------------------------------- VOLUNTEER REGISTRATION --------------------------------------
        
class VolunteerPhoneSerializer(serializers.ModelSerializer):

    class Meta:
        model = PhoneVolounteer
        fields = ['number']


class VolunteerSerializer(serializers.ModelSerializer):
    phone = VolunteerPhoneSerializer(many=True)
    
    class Meta:
        model = Volounteer
        fields = ['name', 'email', 'city', 'house_no', 'phone', 'qualification', 'designation']
    

class VolunteerRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    profile = VolunteerSerializer(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'password', 'profile']
    
    def validate(self, attrs):
        if len(attrs['password']) < 8:
            raise serializers.ValidationError('Passsword must be at least 8 characters long')
        return attrs
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        phone_number = profile_data.pop('phone')
        
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
 
# ---------------------------------------- DONOR REGISTRATION --------------------------------------------
   
from donor.models import PhoneDonor, Donor

class DonorPhoneSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PhoneDonor
        fields = ['number']
    
class DonorSerializer(serializers.ModelSerializer):
    phone = DonorPhoneSerializer(many=True)
    
    class Meta:
        model = Donor
        fields = ['name', 'email', 'phone', 'district', 'city', 'pincode', 'address']

class DonorRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    profile = DonorSerializer(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'password', 'profile']
    
    def validate(self, attrs):
        if len(attrs['password']) < 8:
            raise serializers.ValidationError('Passsword must be at least 8 characters long')
        return attrs
    
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        phone_number = profile_data.pop('phone')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        
        d_count = Donor.objects.count()
        id = 'D' + str(d_count+1)
        
        donor = Donor.objects.create(
            user = user,
            d_id = id,
            name = profile_data['name'],
            email = profile_data['email'],
            city = profile_data['city'],
            district = profile_data['district'],
            address = profile_data['address'],
            pincode = profile_data['pincode']
        )
        
        for num in phone_number:
            PhoneDonor.objects.create(donor=donor, **num)
        
        return user


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.exceptions import ObjectDoesNotExist



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Determine the user's profile type across different apps
        try:
            if hasattr(user, 'donor'):
                token['user_type'] = 'donor'
            elif hasattr(user, 'volunteer'):
                token['user_type'] = 'volunteer'
            elif hasattr(user, 'center'):
                token['user_type'] = 'center'
            else:
                token['user_type'] = 'unknown'
        except ObjectDoesNotExist:
            token['user_type'] = 'unknown'

        return token
