from django.urls import path, include

from .views import beneficiary_request

urlpatterns = [
    path('beneficiary/request', beneficiary_request, name='beneficiary_request'),
]