from django.urls import path,include
from . import views
urlpatterns = [
    path('donor/request', views.item_pickup, name='item_pickup'),
]