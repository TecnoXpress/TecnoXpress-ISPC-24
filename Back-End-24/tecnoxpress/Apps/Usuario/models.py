from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class Usuario(AbstractUser):
  dni = models.IntegerField(default=None,null=True)
  fecha_de_nacimiento = models.DateField(blank=True, null=True)
  direccion = models.CharField(max_length=50)
  fecha_registro = models.DateField(blank=True, null=True)
  nro_telefonico = models.CharField(max_length=15, blank=True, null=True)
  email = models.EmailField(max_length= 150, unique=True)



  

