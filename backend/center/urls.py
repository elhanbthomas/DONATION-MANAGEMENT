from django.urls import path, include
from . import views
urlpatterns = [
    path('donor/pickup/request', views.pickup_request, name='pickup_request'),
    path('volunteer/assign', views.assign_volunteer, name='assign_volunteer'),
    path('volunteer/mypickups', views.pickupDetails, name='pickup_details'),
    path('pickup/update', views.change_pickup_status, name='status_change'),
    path('donor/request/details', views.showDonorRequests, name='request_details'),
]