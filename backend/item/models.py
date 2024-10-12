from django.db import models
from center.models import Center
from donor.models import Donor
from center.models import Volounteer


class ItemType(models.Model):
    type_id = models.CharField(primary_key=True, max_length= 20)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    timestamp  = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

from donor.models import Donor

class DonorRequest(models.Model):
    item_type = models.ForeignKey(ItemType, on_delete=models.PROTECT)
    description = models.TextField(null=True)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    image = models.ImageField(upload_to='donation/', null=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True)
    
    def __str__(self):
        return str(self.donor)


class ItemReceive(models.Model):
    Itemreceive_id = models.CharField(primary_key=True, max_length=5)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField()
    description = models.TextField()
    isReceived = models.BooleanField(default=False)
    Volounteer_id = models.ForeignKey(Volounteer,on_delete=models.CASCADE)
    image = models.ImageField(blank=True, null=True)
    

class ItemPickup(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    volunteer = models.ForeignKey(Volounteer,on_delete=models.CASCADE)
    center = models.ForeignKey(Center, on_delete= models.CASCADE)
    donor_request = models.ForeignKey(DonorRequest, on_delete=models.PROTECT, blank=True, null=True)
    
    
# class Items(models.Model):
#     Item_id = models.CharField(primary_key=True, max_length=5)
#     # Pickup_id = models.ForeignKey(ItemPickup, on_delete=models.CASCADE)
    


