
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls'), name='api'),
    path('api/', include('donor.urls'),name = 'donor'),
    path('api/', include('center.urls'), name = 'center'),
    path('api/', include('item.urls'), name = 'item')
]
