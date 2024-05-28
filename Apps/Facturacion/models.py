from django.db import models
from Apps.Usuario.models import Usuario
from Apps.Producto.models import Carrito

# Create your models here.

class Pago(models.Model):
    usuario = models.ForeignKey(Usuario,on_delete=models.DO_NOTHING)
    fecha = models.DateTimeField(auto_now_add=True)
    monto = models.FloatField(default=0)
    carrito = models.OneToOneField(Carrito, on_delete=models.DO_NOTHING)

    class Meta:
        db_table = 'pago'
        verbose_name = 'Pago'
        verbose_name_plural = 'Pagos'

    def __str__(self):
        return f"{self.usuario.Usuarioname} - {self.fecha}"
    


class MetodoPago(models.Model):
    metodo = models.CharField(max_length=150)
    description = models.CharField(max_length=250,null=True, blank=True)

    class Meta:
        db_table = 'metodo_pago'
        verbose_name = 'Forma de pago'
        verbose_name_plural = 'Formas de pagos'

    def __str__(self):
        return f"{self.metodo}"