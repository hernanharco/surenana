from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClientsNewViewSet,    
)

router = DefaultRouter()
router.register(r'clientsNew', ClientsNewViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]