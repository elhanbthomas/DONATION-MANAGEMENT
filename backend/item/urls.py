from django.urls import path,include
from . import views
urlpatterns = [
    path('donor/request', views.item_pickup, name='item_pickup'),
    path('itemtypes', views.item_type_list, name='item_types')
]