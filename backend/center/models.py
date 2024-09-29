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
