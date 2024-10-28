from django.db import models

class Beneficiary(models.Model):
    B_id = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=12)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    address = models.TextField()
    pincode = models.CharField(max_length=6)
    createdAt = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.B_id}: {self.name}'
    
class BeneficiaryRequest(models.Model):
    item_type = models.ForeignKey('item.ItemType', on_delete=models.PROTECT)
    quantity = models.IntegerField()
    beneficiary = models.ForeignKey(Beneficiary, on_delete=models.CASCADE)
    accepted_request = models.BooleanField(default=False)
    request_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.beneficiary}: {self.item_type}"
    
    