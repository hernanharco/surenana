# views.py
from rest_framework.viewsets import ModelViewSet
from .models import ClientsNew
from .serializers import ClientsNewSerializer

class ClientsNewViewSet(ModelViewSet):
    queryset = ClientsNew.objects.all()
    serializer_class = ClientsNewSerializer