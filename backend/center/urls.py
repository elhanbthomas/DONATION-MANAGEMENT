from django.urls import path, include
from . import views
urlpatterns = [
    path('donor/pickup/request', views.pickup_request, name='pickup_request')
]