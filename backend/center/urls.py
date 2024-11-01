from django.urls import path, include
from . import views
urlpatterns = [
    path('donor/pickup/request', views.pickup_request, name='pickup_request'),
    path('volunteer/assign', views.assign_volunteer, name='assign_volunteer'),
    path('volunteer/mypickups', views.pickupDetails, name='pickup_details'),
    path('pickup/update', views.change_pickup_status, name='status_change'),
    path('donor/request/details', views.showDonorRequests, name='request_details'),
    path('center/volunteers', views.volunteer_list, name='volunteer_list'),
    path('center/donor/receive', views.direct_receive, name='direct_receive'),
    path('center/inventory', views.inventory_list, name='inventory_list'),
    path('center/list', views.center_list, name='center_list')

]