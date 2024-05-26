from django.contrib import admin
from .models import Usuario

class UsuarioAdmin (admin.ModelAdmin):
    list_display = ('username', 'contrasena', 'nombre', 'apellido', 'dni', 'fecha_de_nacimiento', 'direccion', 'fecha_registro', 'nro_telefonico', 'email')

admin.site.register(Usuario,UsuarioAdmin)