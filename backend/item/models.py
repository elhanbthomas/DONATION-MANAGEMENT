from django.db import models
from center.models import Center
from donor.models import Donor
from center.models import Volounteer
# Create your models here.

class ItemType(models.Model):
    type_id = models.CharField(primary_key=True, max_length= 20)
    name = models.CharField(max_length=100)
    description = models.TextField(default="enter description")
    timestamp  = models.DateTimeField()

class ItemReceive(models.Model):
    Itemreceive_id = models.CharField(primary_key=True, max_length=5)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField()
    description = models.TextField()
    Volounteer_id = models.ForeignKey(Volounteer,on_delete=models.CASCADE)

class ItemPickup(models.Model):
    Pickup_id = models.CharField(primary_key=True, max_length=5)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField()
    description = models.TextField()
    Volounteer_id = models.ForeignKey(Volounteer,on_delete=models.CASCADE)
    Center_id = models.ForeignKey(Center, on_delete= models.CASCADE)
    
    
class Items(models.Model):
    Item_id = models.CharField(primary_key=True, max_length=5)
    Pickup_id = models.ForeignKey(ItemPickup, on_delete=models.CASCADE)
    
    


