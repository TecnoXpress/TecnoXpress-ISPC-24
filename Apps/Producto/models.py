from django.db import models
from Apps.Usuario.models import Usuario

class Categoria(models.Model):
    tipo = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'categoria'
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

    def __str__(self):
        return self.tipo
    

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100,null=True,blank=True)
    precio = models.IntegerField()
    stock = models.IntegerField()
    imagen = models.ImageField(null=True,blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = 'producto'
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return self.nombre
    

class Carrito(models.Model):

    usuario = models.OneToOneField(Usuario,on_delete=models.CASCADE)
    productos = models.ManyToManyField("Producto")

    class Meta:
        db_table = 'carrito'
        verbose_name = 'Carrito'
        verbose_name_plural = 'Carrito'

    def __str__(self):
        return f"Carrito de: {self.usuario.Usuarioname}"


    def calcular_precio(self):
        self.total = 0
        for producto in self.productos.all():
            self.total += producto.precio
        return self.total
    