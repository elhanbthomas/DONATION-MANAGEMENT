from django.urls import path,include
from . import views
urlpatterns = [
    path('donor/pickup', views.item_pickup, name='item_pickup'),
    path('request/details', views.showPickups, name='request_details'),
]