from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)
from . import views 


urlpatterns = [
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    path('api/register/volunteer', views.registerVolunteer, name='volunteer_register'),
    path('api/register/donor', views.registerDonor, name='donor_register'),
    path('api/details', views.get_details, name="get_details")
]

