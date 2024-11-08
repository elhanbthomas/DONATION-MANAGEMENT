from django.urls import path, include

from .views import beneficiary_request, accept_beneficiary_request, list_requests

urlpatterns = [
    path('beneficiary/request', beneficiary_request, name='beneficiary_request'),
    path('beneficiary/accept', accept_beneficiary_request, name='accept_request'),
    path('beneficiary/request/list', list_requests, name='request_list')
]