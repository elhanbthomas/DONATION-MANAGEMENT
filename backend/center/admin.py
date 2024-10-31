from django.contrib import admin

from .models import Volounteer, Center, PhoneVolounteer, VolounteerPickup, Inventory

admin.site.register(Volounteer)
admin.site.register(Center)
admin.site.register(PhoneVolounteer)
admin.site.register(VolounteerPickup)
admin.site.register(Inventory)