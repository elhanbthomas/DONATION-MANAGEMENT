
from django.contrib.auth.models import User
from django.db import models
from django.core.validators import MinValueValidator

class Center(models.Model):
    CenterID = models.CharField(max_length=4,primary_key=True)
    name = models.CharField(max_length=200,null = False)
    email = models.EmailField()
    isMain =  models.BooleanField()
    City = models.CharField(max_length=200)
    State = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Volounteer(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    v_id = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=100)
    address = models.TextField(null=True)
    city = models.CharField(max_length=100, null=True)
    email = models.EmailField()
    qualification = models.CharField(max_length=255, null=True)
    designation = models.CharField(max_length=255, null=True)
    Center_id = models.ForeignKey(Center, on_delete = models.PROTECT, blank=True, null=True)
    
    def __str__(self):
        return self.v_id + ": " + self.name

    
# class PhoneCenter(models.Model):
#     Center_id = models.ForeignKey(Center, on_delete=models.CASCADE)
#     phonenumber = models.BigIntegerField()

    

# class CenterShipping(models.Model):
#     ShippingID = models.SmallIntegerField(primary_key=True)
#     fromAdress = models.CharField(max_length=255)
#     toAdress = models.CharField(max_length=255)
    

class PhoneVolounteer(models.Model):
    volunteer = models.ForeignKey(Volounteer, on_delete=models.CASCADE)
    number = models.CharField(max_length=10, blank=True, null=True)
    
    def __str__(self):
        return self.number


class VolounteerPickup(models.Model):
    assigned_time = models.DateTimeField(auto_now_add=True)
    pickup_id = models.ForeignKey('item.ItemPickup', on_delete=models.CASCADE)
    volunteer = models.ForeignKey(Volounteer, on_delete=models.CASCADE, null=True)
    isPicked  = models.BooleanField(default=False)
    isReceived = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.volunteer}: {self.pickup_id}"
# class CenterReceive(models.Model):
#     CenterReceiveID = models.IntegerField(primary_key=True)
    # ShippingID = models.ManyToOneRel(CenterShipping, null = False)
    # timestamp = models.DateTimeField(null = False)



# class CenterShipment(models.Model):
#     CenterShipment_id = models.CharField(max_length=5,primary_key=True)
#     timestamp = models.DateTimeField()
#     agent = models.CharField(max_length=50)

# class CenterRequest(models.Model):
#     CenterReq_id = models.CharField(primary_key=True, max_length=5)
#     description = models.TextField(max_length=200)
#     quantity = models.IntegerField()
#     Center_id = models.ForeignKey(Center, on_delete=models.CASCADE)
#     Shipment_id = models.ForeignKey(CenterShipment, on_delete=models.CASCADE)



class Inventory(models.Model):
    inventory_id = models.CharField(max_length=5)
    center = models.ForeignKey(Center, on_delete=models.CASCADE)
    item_type = models.ForeignKey('item.ItemType', on_delete=models.PROTECT)
    quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    last_updated = models.DateTimeField(auto_now=True)