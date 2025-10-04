from rest_framework import serializers
from .models import ClientsNew

class ClientsNewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientsNew
        fields = '__all__'