from django.contrib import admin

from .models import Volounteer, Center, PhoneVolounteer, VolounteerPickup, Inventory, CenterRequest, CenterShipping, CenterReceive

admin.site.register(Volounteer)
admin.site.register(Center)
admin.site.register(PhoneVolounteer)
admin.site.register(VolounteerPickup)
admin.site.register(Inventory)

admin.site.register(CenterRequest)
admin.site.register(CenterReceive),
admin.site.register(CenterShipping)