from django.urls import path,include
from . import views
urlpatterns = [
    path('api/volunteer/pickup', view=views.pickupList, name='volunteer_pickup')
]