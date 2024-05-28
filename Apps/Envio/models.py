from django.db import models
from Apps.Usuario.models import Usuario
from Apps.Producto.models import Carrito

# Create your models here.

class Envio(models.Model):
    usuario = models.OneToOneField(Usuario,on_delete=models.CASCADE)
    localidad = models.ForeignKey("Localidad", on_delete=models.CASCADE)
    direccion = models.CharField(max_length=150)
    descripcion = models.CharField(max_length=250,null=True, blank=True)
    carrito = models.OneToOneField(Carrito, on_delete=models.CASCADE)
    fecha_envio = models.DateTimeField(auto_now_add=True,null=True)
    entregado = models.BooleanField(default=False)

    class Meta:
        db_table = 'envio'
        verbose_name = 'Envío'
        verbose_name_plural = 'Envíos'

    def __str__(self):
        return f"{self.usuario.Usuarioname} | {self.localidad.nombre}"
    

class Localidad(models.Model):
    nombre = models.CharField(max_length=250)
    codigo_postal = models.CharField(max_length=50)
    provincia = models.ForeignKey("Provincia", on_delete=models.CASCADE)

    class Meta:
        db_table = 'localidad'
        verbose_name = 'Localidad'
        verbose_name_plural = 'Localidades'

    def __str__(self):
        return f"{self.nombre} | {self.provincia.nombre}"

class Provincia(models.Model):
    nombre = models.CharField(max_length=250)

    class Meta:
        db_table = 'provincia'
        verbose_name = 'Provincia'
        verbose_name_plural = 'Provincias'

    def __str__(self):
        return f"{self.nombre}"
    

        
