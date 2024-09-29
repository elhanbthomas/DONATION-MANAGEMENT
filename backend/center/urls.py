from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.center_view, name = 'center-page')
]