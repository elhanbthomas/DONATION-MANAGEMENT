from django.contrib import admin

from .models import Beneficiary, BeneficiaryRequest

admin.site.register(BeneficiaryRequest)
admin.site.register(Beneficiary)
