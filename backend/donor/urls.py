from django.urls import path, include
from . import views
urlpatterns = [
    path('donor/myrequests', views.donor_request_details, name='myrequest_details')
]