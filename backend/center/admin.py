from django.contrib import admin

from .models import Volounteer, Center, PhoneVolounteer, VolounteerPickup

admin.site.register(Volounteer)
admin.site.register(Center)
admin.site.register(PhoneVolounteer)
admin.site.register(VolounteerPickup)