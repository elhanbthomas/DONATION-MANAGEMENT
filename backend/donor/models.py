from django.db import models
from django.contrib.auth.models import User
from center.models import Center

class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    d_id = models.CharField(primary_key=True,max_length =5)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    district = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    pincode = models.CharField(max_length=6, blank=True, null=True)
    address = models.TextField(null=True)
    
    def __str__(self):
        return f"{self.d_id}: {self.name}"


class BeneficiaryRequest(models.Model):
    BenRequest_id = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=100)
    address = models.TextField(max_length=200)
    Center_id = models.ForeignKey(Center, on_delete=models.CASCADE)
    items = models.TextField(max_length=200)
    description = models.TextField(max_length=200)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField()
    phonenumber = models.BigIntegerField()

class PhoneDonor(models.Model):
    donor = models.ForeignKey(Donor, on_delete=models.PROTECT)
    number = models.CharField(max_length=10, null=True)
    
    def __str__(self):
        return f"{self.donor}: {self.number}"

