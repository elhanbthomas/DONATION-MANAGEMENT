from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.donor_view, name = 'donor-page'),
    path('benificiaryrequest/create/', views.BeneficiaryRequestCreate.as_view(), name = "create-beneficiaryrequest"),
    path('beneficiaryrequest/update/<int:pk>', views.BeneficiaryRequestUpdate.as_view(),name ="Beneficiaryrequest-create"),
    path('beneficiaryrequest/search/', views.BeneficiaryRequestList.as_view(), name = "beneficiaryrequestsearch")
]