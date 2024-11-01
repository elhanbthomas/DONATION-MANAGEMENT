from django.urls import path, include
from . import views
urlpatterns = [
    path('donor/pickup/request', views.pickup_request, name='pickup_request'),
    path('volunteer/assign', views.assign_volunteer, name='assign_volunteer'),
    path('volunteer/mypickups', views.pickupDetails, name='pickup_details'),
    path('pickup/update', views.change_pickup_status, name='status_change'),
    path('center/create-center-request/', views.create_request, name='create_center_request'),
    path('requests/', views.list_center_requests, name='center-request-list'), 
    path('requests/create/', views.create_request, name='create-center-request'), 
    path('requests/accept/<int:request_id>/', views.accept_request, name='accept-center-request'),
    path('requests/mark-received/<int:shipment_id>/', views.mark_received, name='mark-center-received'),
    path('shipments/update/<int:shipment_id>/', views.update_shipment_status, name='update-shipment-status'),
]