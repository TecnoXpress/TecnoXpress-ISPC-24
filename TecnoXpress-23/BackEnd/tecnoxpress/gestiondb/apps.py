from django.apps import AppConfig
from .utils import crear_base_de_datos_si_no_existe, ejecutar_script_sql

class GestiondbConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'gestiondb'

class MiAppConfig(AppConfig):
    name = 'gestiondb'

    def ready(self):
        crear_base_de_datos_si_no_existe()
        ejecutar_script_sql()
