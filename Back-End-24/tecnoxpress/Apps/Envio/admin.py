from django.contrib import admin
from .models import *


class codigoPostalAdmin (admin.ModelAdmin):
    list_display = ('Codigo postal', 'Localidad')
    
class provinciaAdmin (admin.ModelAdmin):
    list_display = ('Provincia')
    
admin.register (CodigoPostal, codigoPostalAdmin)
admin.register (Provincia, provinciaAdmin)
admin.register (Envio)
