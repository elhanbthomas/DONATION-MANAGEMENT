from django.contrib import admin

from .models import ItemType,ItemPickup, ItemReceive

admin.site.register(ItemType)
admin.site.register(ItemPickup)
admin.site.register(ItemReceive)
