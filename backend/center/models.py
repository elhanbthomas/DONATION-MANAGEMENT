<<<<<<< HEAD
from django.contrib.auth.models import User
from django.db import models

class Center(models.Model):
    CenterID = models.CharField(max_length=4,primary_key=True)
    name = models.CharField(max_length=200,null = False)
    email = models.CharField(max_length=50)
    isMain =  models.BooleanField()
    City = models.CharField(max_length=200)
    State = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class PhoneCenter(models.Model):   
    CenterID = models.ForeignKey(Center,on_delete = models.SET_NULL,null= False)
    PhoneNumber = phone = models.CharField(primary_key=True)

class Volounteer(models.Model):
    VolounteerID = models.CharField(max_length = 200)
    name = models.ForeignKey(User.username,max_length = 200)  
    city = models.CharField(max_length = 100)  
    phone = models.CharField()
    email = models.ForeignKey(User.email) 
    def __str__(self):
        return self.name 

class PhoneVolounteer(models.Model):
    VolounteerID = models.OneToOneField(Volounteer)
    phone = models.CharField()

class VolounteerPickup(models.Model):
    VolounteerPickupID = models.IntegerField(primary_key=True)
    timestamp = models.DateTimeField()
    VolounteerID = models.ManyToOneRel(Volounteer,null = False)

class CenterRequest(models.Model):
    RequestID = models.SmallIntegerField(primary_key=True)
    quantity = models.IntegerField(null = False)
    description = models.TextField(max_length=255)

class CenterShipping(models.Model):
    ShippingID = models.SmallIntegerField(primary_key=True)
    fromAdress = models.CharField(max_length=255)
    toAdress = models.CharField(max_length=255)

class CenterReceive(models.Model):
    CenterReceiveID = models.IntegerField(primary_key=True)
    ShippingID = models.ManyToOneRel(CenterShipping, null = False)
    timestamp = models.DateTimeField(null = False)

=======
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Center(models.Model):
    host = models.OneToOneField(User,on_delete=models.CASCADE)
    Center_id = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    isMain = models.BooleanField()
    City = models.CharField(max_length=200)
    State = models.CharField(max_length=200)

class PhoneCenter(models.Model):
    Center_id = models.ForeignKey(Center, on_delete=models.CASCADE)
    phonenumber = models.BigIntegerField()

class CenterShipment(models.Model):
    CenterShipment_id = models.CharField(max_length=5,primary_key=True)
    timestamp = models.DateTimeField()
    agent = models.CharField(max_length=50)

class CenterRequest(models.Model):
    CenterReq_id = models.CharField(primary_key=True, max_length=5)
    description = models.TextField(max_length=200)
    quantity = models.IntegerField()
    Center_id = models.ForeignKey(Center, on_delete=models.CASCADE)
    Shipment_id = models.ForeignKey(CenterShipment, on_delete=models.CASCADE)

class Volounteer(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    Volounteer_id = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    email = models.EmailField()
    qualification = models.TextField()
    designation = models.TextField()
    Center_id = models.ForeignKey(Center, on_delete = models.CASCADE)

class PhoneVolounteer(models.Model):
    Volounteer_id = models.ForeignKey(Volounteer, on_delete=models.CASCADE)
    phonenumber = models.BigIntegerField()
>>>>>>> main
