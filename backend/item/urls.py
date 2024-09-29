from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.item_view, name = 'item-page')
]