import os
import subprocess
import mysql.connector
import django
from django.conf import settings

def create_database_if_not_exists():
    try:
        # Conectar al servidor de MySQL (asegúrate de proporcionar los detalles correctos)
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Franco4567"
        )

        # Crear un cursor para ejecutar consultas SQL
        cursor = connection.cursor()

         # Verificar si la base de datos ya existe
        cursor.execute("SHOW DATABASES LIKE 'tecnoxpress'")
        result = cursor.fetchone()

        if not result:
            # Si la base de datos no existe, crearla
            cursor.execute("CREATE DATABASE tecnoxpress")
            print("Base de datos creada correctamente.")
        else:
            print("Base de datos ya existe.")

        # Confirmar los cambios
        connection.commit()

        # Cerrar la conexión y el cursor
        cursor.close()
        connection.close()
    except mysql.connector.Error as err:
        print(f"Error al conectar y crear la base de datos: {err}")

def run_migrations():
    try:
        # Ejecutar la función para crear la base de datos si no existe
        create_database_if_not_exists()
        
        # Ejecutar el comando 'py manage.py makemigrations'
        subprocess.run(['py', 'manage.py', 'makemigrations', 'Facturacion', 'Usuario', 'Envio', 'Producto'], check=True)
        # Ejecutar el comando 'py manage.py migrate'
        subprocess.run(['py', 'manage.py', 'migrate'], check=True)
        print("Migraciones realizadas con éxito.")
    except subprocess.CalledProcessError as e:
        # Manejar errores si los comandos fallan
        print(f"Error al ejecutar el comando: {e}")


def install_dependencies():
    try:
        # Ejecutar el comando para instalar las dependencias del archivo requirements.txt
        subprocess.run(['py', '-m', 'pip', 'install', '-r', 'requirements.txt'], check=True)
        print("Dependencias instaladas correctamente.")
    except subprocess.CalledProcessError as e:
        # Manejar errores si la instalación falla
        print(f"Error al instalar las dependencias: {e}")

def create_superuser():
    try:
        # Configurar el entorno de Django
        os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tecnoxpress.settings')
        django.setup()
        
        from Apps.Usuario.models import Usuario

        # Verificar si el superusuario 'ProfesISPC' ya existe
        if not Usuario.objects.filter(username='ProfesISPC').exists():
            # Crear el superusuario 'ProfesISPC' si no existe
            Usuario.objects.create_superuser('ProfesISPC', 'profesISPC@admin.com', 'admin')
            print("Superusuario creado correctamente.")
        else:
            print("El superusuario 'ProfesISPC' ya existe.")
    except Exception as e:
        print(f"Error al crear el superusuario: {e}")
        
if __name__ == "__main__":
    install_dependencies()
    run_migrations()
    create_superuser()
