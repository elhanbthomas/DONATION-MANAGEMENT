from django.urls import path, include
from . import views
urlpatterns = [
    path('donor/pickup/request', views.pickup_request, name='pickup_request'),
    path('volunteer/assign', views.assign_volunteer, name='assign_volunteer'),
    path('volunteer/mypickups', views.pickupDetails, name='pickup_details'),
    path('pickup/update', views.change_pickup_status, name='status_change'),
    path('center/create-center-request/', views.create_request, name='create_center_request'),
    path('center/center-requests/', views.list_center_requests, name='list_center_requests'),
    path('accept-center-request/<int:request_id>/', views.accept_center_request, name='accept_center_request')
]