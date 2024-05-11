from django.db import connection
from django.db.utils import OperationalError

def crear_base_de_datos_si_no_existe():
    try:
        # Verificar si la base de datos ya existe
        with connection.cursor() as cursor:
            cursor.execute("USE tecnoxpress")
        print("La base de datos 'tecnoxpress' ya existe. No es necesario crearla.")
    except OperationalError:
        # Si la base de datos no existe, crearla
        print("La base de datos 'tecnoxpress' no existe. Creándola...")
        with connection.cursor() as cursor:
            cursor.execute("CREATE DATABASE IF NOT EXISTS tecnoxpress")
        print("La base de datos 'tecnoxpress' ha sido creada.")


def ejecutar_script_sql():
    with open('/TecnoXpress-23/BackEnd/sql/SQL_TecnoXpress.sql', 'r') as archivo_sql:
        sql_statements = archivo_sql.read()

    with connection.cursor() as cursor:
        cursor.execute(sql_statements)