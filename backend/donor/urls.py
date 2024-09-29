from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.donor_view, name = 'donor-page')
]