from django.contrib import admin

from Apps.Producto.models import Producto, Categoria, Carrito

# Register your models here.


admin.site.register(Producto)
admin.site.register(Categoria)
admin.site.register(Carrito)