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

