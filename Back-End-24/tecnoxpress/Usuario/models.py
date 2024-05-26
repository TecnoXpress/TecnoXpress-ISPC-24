from django.db import models

class Usuario(models.Model):
    id_usuarios = models.AutoField(primary_key=True)
    username = models.CharField(max_length=40)
    contrasena = models.CharField(max_length=13)
    nombre = models.CharField(max_length=60)
    apellido = models.CharField(max_length=60, blank=True, null=True)
    dni = models.IntegerField()
    fecha_de_nacimiento = models.DateField(blank=True, null=True)
    direccion = models.CharField(max_length=50)
    fecha_registro = models.DateField(blank=True, null=True)
    nro_telefonico = models.CharField(max_length=15, blank=True, null=True)
    email = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'usuarios'
        