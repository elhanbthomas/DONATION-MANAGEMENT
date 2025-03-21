
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls'), name='api'),

    path('api/', include('donor.urls'),name = 'donor'),
    path('api/', include('center.urls'), name = 'center'),
    path('api/', include('item.urls'), name = 'item'),
    path('api/', include('beneficiary.urls'), name = 'beneficiary')
]

if settings.DEBUG:  # This serves media files only in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)