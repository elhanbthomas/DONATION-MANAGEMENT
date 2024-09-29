
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls'), name='api'),
    path('donor/', include('donor.urls'),name = 'donor'),
    path('center/', include('center.urls'), name = 'center'),
    path('item/', include('item.urls'), name = 'item')
]
