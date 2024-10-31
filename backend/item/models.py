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

# from donor.models import Donor
   

class ItemPickup(models.Model):
    requested_at = models.DateTimeField(auto_now_add=True)
    item_type = models.ForeignKey(ItemType, on_delete=models.PROTECT, null=True)
    quantity = models.IntegerField(null=True)
    description = models.TextField(null=True)
    image = models.ImageField(upload_to='item_pickup/', null=True)
    center = models.ForeignKey(Center, on_delete= models.CASCADE)
    donor = models.ForeignKey('donor.Donor', on_delete=models.CASCADE, null=True)
    isAccepted = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.item_type}: {self.donor} ({str(self.pk)})"
    
    
class ItemReceive(models.Model):
    received_at = models.DateTimeField(auto_now_add=True, null=True)
    Volounteer_id = models.ForeignKey(Volounteer,on_delete=models.CASCADE, null=True)
    pickup = models.ForeignKey(ItemPickup, on_delete=models.PROTECT, null=True)
    center = models.ForeignKey(Center, on_delete=models.PROTECT, null=True)
    
    def __str__(self):
        return str(self.pk) + ': ' + str(self.center)
    
# class Items(models.Model):
#     Item_id = models.CharField(primary_key=True, max_length=5)
#     # Pickup_id = models.ForeignKey(ItemPickup, on_delete=models.CASCADE)
    


