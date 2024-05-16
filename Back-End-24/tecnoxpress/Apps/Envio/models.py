from django.db import models
from Apps.Usuario.models import Usuario

class CodigoPostal(models.Model):
    id_codigo_postal = models.AutoField(primary_key=True)
    id_provincia = models.ForeignKey('Provincia', models.DO_NOTHING, db_column='id_provincia')
    codigo_postal = models.IntegerField()
    localidad = models.CharField(max_length=45)

    class Meta:
        db_table = 'codigo_postal'
        verbose_name = 'Código postal'
        verbose_name_plural = 'Códigos postales'
    
    def __str__(self):
        return str(self.codigo_postal)

class Provincia(models.Model):
    id_provincia = models.AutoField(primary_key=True)
    provincia = models.CharField(max_length=50)

    class Meta:
        db_table = 'provincia'
        verbose_name = 'Provincia'
        verbose_name_plural = 'Provincias'
    
    def __str__(self):
        return self.provincia
        
class Envio(models.Model):
    id_envio = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, db_column='id_usuarios')
    codigo_postal = models.ForeignKey(CodigoPostal, on_delete=models.CASCADE, db_column='id_codigo_postal')

    class Meta:
        db_table = 'envio'
        verbose_name = 'Envío'
        verbose_name_plural = 'Envíos'

    def __str__(self):
        return f'Envío {self.id_envio} - Usuario: {self.usuario} - Código Postal: {self.codigo_postal}'

    

        
