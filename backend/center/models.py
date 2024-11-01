
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


class Inventory(models.Model):
    center = models.ForeignKey(Center, on_delete=models.CASCADE)
    item_type = models.ForeignKey('item.ItemType', on_delete=models.PROTECT)
    quantity = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    last_updated = models.DateTimeField(auto_now=True)

class CenterRequest(models.Model):
    description = models.TextField(max_length=200)
    quantity = models.IntegerField()
    status = models.CharField(max_length=20, default='Pending')
    fromCenter = models.ForeignKey(Center, on_delete=models.CASCADE)
    to_center = models.ForeignKey(Center, on_delete=models.CASCADE)
    def accept(self):
        self.status = "Accepted"
        self.save()
        CenterShipping.objects.create(
            from_center=self.to_center,
            to_center=self.from_center,
            in_transit=True,
        )

class CenterShipping(models.Model):
    fromCenter = models.ForeignKey(Center, on_delete= models.CASCADE)
    toCenter  = models.ForeignKey(Centeron_delete= models.CASCADE)
    fromAdress = models.CharField(max_length=255,null=True)
    toAdress = models.CharField(max_length=255,null=True)
    inTransit = models.BooleanField(default=False)

class CenterReceive(models.Model):
    ShippingID = models.ForeignKey(CenterShipping, null = False)
    timestamp = models.DateTimeField(null = False)
    Received = models.BooleanField(default=False)



# class CenterShipment(models.Model):
#     CenterShipment_id = models.CharField(max_length=5,primary_key=True)
#     timestamp = models.DateTimeField()
#     agent = models.CharField(max_length=50)

