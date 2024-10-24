from django.contrib import admin

from .models import ItemType, DonorRequest, ItemPickup

admin.site.register(ItemType)
admin.site.register(ItemPickup)
admin.site.register(DonorRequest)