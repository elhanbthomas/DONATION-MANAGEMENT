from django.urls import path,include
from . import views
urlpatterns = [
    path('api/volunteer/pickup', view=views.pickupList, name='volunteer_pickup'),
    path('api/donor/request', view=views.donor_request, name='donor_request')
]