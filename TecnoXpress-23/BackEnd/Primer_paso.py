import os
import mysql.connector
from mysql.connector import Error

class BaseDeDatos:
    #IMPORTANTE: tener en cuenta de reemplazar host, user, password, y port con los valores de sus servidor
    def __init__(self,):
            self.host = "localhost"
            self.user = "root"
            self.password = "root"
            self.database = "tecnoxpress"
            self.port = 3306
    
    def base_de_datos_existe(self):
        try:
            conexion = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password
            )
            cursor = conexion.cursor()
            cursor.execute("SHOW DATABASES")
            databases = [database[0] for database in cursor]
            return "tecnoxpress" in databases
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            return False

    def crear_base_de_datos(self):
       
        conexion = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password
        )
        cursor = conexion.cursor()
        cursor.execute("CREATE DATABASE tecnoxpress")
        print("Base de datos 'tecnoxpress' creada con éxito.")
        
        self.crear_tablas ()
        
         

    # def abrir_base(self):
    #     # Conectarse a la base de datos
    #     self.conexion = mysql.connector.connect(
    #         host=self.host,
    #         user=self.user,
    #         password=self.password,
    #         database=self.database,
    #         port= self.port
    #     )
    #     return self.conexion
    
    # def cursor(self):
    #     # Obtener un cursor para ejecutar consultas SQL
    #     self.base = self.abrir_base()
    #     self.cursor = self.base.cursor()
    #     return self.cursor

    # def confirmar_cambios(self):
    #     # Confirmar los cambios en la base de datos
    #     self.base.commit()

    # def cerrar_base(self):
    #     # Cerrar el cursor y la conexión a la base de datos
    #     if self.cursor:
    #         self.cursor.close()
    #     if self.base:
    #         self.base.close()

    # def crear_tablas(self):
    #     current_directory = os.path.dirname(os.path.realpath(__file__))

    #     # Ruta completa al archivo SQL
    #     sql_file_path = os.path.join(current_directory,'sql', 'SQL_TecnoXpress.sql')
        
    #     try:
    #         # Configuración de la conexión a la base de datos
    #         conexion = self.abrir_base()
    #         cursor = conexion.cursor()

    #         with open(sql_file_path, 'r') as file:
    #             sql_script = file.read()

    #         with open(sql_file_path, 'r') as file:
    #             sql_statements = file.read().split(';')

    #         for statement in sql_statements:
    #             if statement.strip():
    #                 cursor.execute(statement)


    #         # Confirmar los cambios en la base de datos
    #         conexion.commit()
    #         print("Tablas creadas con éxito.")

    #     except Error as e:
    #         print(f"Error: {e}")

    #     finally:
    #         if conexion:
    #             cursor.close()
    #             conexion.close()


if __name__ == "__main__":
    bd = BaseDeDatos()
    bd.crear_base_de_datos()


          