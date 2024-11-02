from django.db import models


class Beneficiary(models.Model):
    B_id = models.CharField(max_length=4, primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=12)
    state = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    address = models.TextField(null=True)
    pincode = models.CharField(max_length=6)
    createdAt = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.B_id}: {self.name}'
    
class BeneficiaryRequest(models.Model):
    item_type = models.ForeignKey('item.ItemType', on_delete=models.PROTECT)
    quantity = models.IntegerField()
    beneficiary = models.ForeignKey(Beneficiary, on_delete=models.CASCADE)
    accepted_request = models.BooleanField(default=False)
    # isDeliverd = models.BooleanField(default=False)
    request_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.beneficiary}: {self.item_type} id: {self.pk}"



class BeneficiaryShipment(models.Model):
    bship_id = models.AutoField(primary_key=True)  # Auto-incrementing primary key
    BR_id = models.ForeignKey(BeneficiaryRequest, on_delete=models.CASCADE, related_name="shipments")
    V_id = models.ForeignKey('center.Volounteer', on_delete=models.CASCADE, related_name="deliveries", null=True)
    isDelivered = models.BooleanField(default=False)
    shipment_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shipment {self.bship_id} for Request {self.BR_id} by Volunteer {self.V_id}"