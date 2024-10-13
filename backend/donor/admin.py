from django.contrib import admin

from .models import Donor, PhoneDonor

admin.site.register(Donor)
admin.site.register(PhoneDonor)
