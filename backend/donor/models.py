from django.db import models
from django.contrib.auth.models import User
from center.models import Center
# Create your models here.
class Donor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    Donor_id = models.CharField(primary_key=True,max_length =5)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    district = models.CharField(max_length=100)
    city = models.CharField(max_length=100)


class Beneficiary(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    Benificiary_id = models.CharField(max_length=5,primary_key=True)
    name = models.CharField(max_length=100)
    address = models.TextField(max_length=200)
    Center_id = models.ForeignKey(Center, on_delete=models.CASCADE)


class BeneficiaryShipment(models.Model):
    BeneficiaryShipment_id = models.CharField(primary_key=True, max_length=5)


class BeneficiaryRequest(models.Model):
    BenRequest_id = models.CharField(primary_key=True, max_length=5)
    items = models.TextField(max_length=200)
    description = models.TextField(max_length=200)
    quantity = models.IntegerField()
    timestamp = models.DateTimeField()
    BeneficiaryShipment_id = models.ForeignKey(BeneficiaryShipment, on_delete=models.CASCADE)
    Benificiary_id = models.ForeignKey(Beneficiary, on_delete=models.CASCADE)    

class PhoneBeneficiary(models.Model):
    Beneficiary_id = models.ForeignKey(Beneficiary, on_delete=models.CASCADE)
    phonenumber = models.BigIntegerField()

class PhoneDonor(models.Model):
    Donor_id = models.ForeignKey(Donor, on_delete=models.CASCADE)
    phonenumber = models.BigIntegerField()

