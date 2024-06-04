IMPORTANTE!!!! 

En el archivo primer_paso.py debera configurar las credenciales para conectar con el servidor de MySQL
connection = mysql.connector.connect(
            host="localhost",
            user="Tu_usuario",
            password="Tu_contraseña"
        )

Dentro del setting de proyecto tecnoxpress se debera configurar las credenciales para conectar con el servidor de MySQL
DATABASES = {
    "sqlite": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    },
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "tecnoxpress",
        "USER": "Tu_usuario",
        "PASSWORD": "Tu_contraseña",
        "HOST": "localhost",
        "PORT": "3306",
        "OPTIONS": {
            "sql_mode": "traditional",
        },
    },
}
En la consola de la terminal dentro del directorio tecnoxpress se debera ejecutar "py primer_paso.py" 
Esto configurara el entorno y el proyecto para comenzar.

Perfil Django 

Para acceder al perfil de administrador de Django tendran el siguiente  super usuarios
Para los profes
Usuario: ProfesISPC
Contraseña: admin

