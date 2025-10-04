from django.db import models

class ClientsNew(models.Model):
    name = models.CharField(max_length=20)    
    familygroup = models.CharField(max_length=10)   

    def __str__(self):
        return f"{self.name}"