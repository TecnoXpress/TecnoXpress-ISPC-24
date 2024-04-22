import BBDD
import datetime
import Decoradores
import sys


class Usuario:
    def __init__(self,):
        self.__username = ""
        self.__contrasena = ""
        self.__fecha_registro = ""
        self.__nombre = ""
        self.__apellido = ""
        self.__dni = ""
        self.__fecha_de_nacimiento = ""
        self.__domicilio = ""
        self.__localidad = ""
        self.__provincia = ""
        self.__codigo_postal = ""
        self.__nro_telefonico = ""
        self.__email = ""
        self.__rol = ""
        
    @property
    def username(self):
        return self.__username
    
    @username.setter
    def username(self, nuevo_usuario):
        self.__username = nuevo_usuario
    
    @property
    def contrasena(self):
        return self.__contrasena
    
    @contrasena.setter
    def contrasena(self, nueva_contrasena):
        self.__contrasena = nueva_contrasena

    @property
    def fecha_registro(self):
        return self.__fecha_registro
    
    @fecha_registro.setter
    def fecha_registro(self, nueva_fecha_registro):
        self.__fecha_registro = nueva_fecha_registro

    @property
    def nombre(self):
        return self.__nombre
    
    @nombre.setter
    def nombre(self, nuevo_nombre):
        self.__nombre = nuevo_nombre
        
    @property
    def apellido(self):
        return self.__apellido
    
    @apellido.setter
    def apellido(self, nuevo_apellido):
        self.__apellido = nuevo_apellido
    
    @property
    def dni(self):
        return self.__dni
    
    @dni.setter
    def dni(self, nuevo_dni):
        self.__dni = nuevo_dni
        
    @property
    def fecha_de_nacimiento(self):
        return self.__fecha_de_nacimiento
    
    @fecha_de_nacimiento.setter
    def fecha_de_nacimiento(self, nueva_fecha_nacimiento):
        self.__fecha_de_nacimiento = nueva_fecha_nacimiento    
    
    @property
    def domicilio(self):
        return self.__domicilio
    
    @domicilio.setter
    def domicilio(self, nuevo_domicilio):
        self.__domicilio = nuevo_domicilio
    
    @property
    def localidad(self):
        return self.__localidad
    
    @localidad.setter
    def localidad(self, nueva_localidad):
        self.__localidad = nueva_localidad
    
    @property
    def provincia(self):
        return self.__provincia
    
    @provincia.setter
    def provincia(self, nueva_provincia):
        self.__provincia = nueva_provincia
    
    @property
    def codigo_postal(self):
        return self.__codigo_postal
    
    @codigo_postal.setter
    def codigo_postal(self, nuevo_codigo_postal):
        self.__codigo_postal = nuevo_codigo_postal
    
    @property
    def nro_telefonico(self):
        return self.__nro_telefonico
    
    @nro_telefonico.setter
    def nro_telefonico(self, nuevo_nro_telefonico):
        self.__nro_telefonico = nuevo_nro_telefonico
    
    @property
    def email(self):
        return self.__email
    
    @email.setter
    def email(self, nuevo_email):
        self.__email = nuevo_email
    
    @property
    def rol(self):
        return self.__rol
    
    @rol.setter
    def rol(self, nuevo_rol):
        self.__rol = nuevo_rol

    
    def cargar_usuario(self):
        # Iniciamos la base de datos
            conexion = BBDD.BaseDeDatos()
            cursor = conexion.cursor()
            
            while True:
                nombre_del_usuario = input ("Ingrese un nombre de usuario: ")
                # Ver si el usuario es unico
                consulta = "SELECT username FROM usuarios WHERE username = %s"
                valor = (nombre_del_usuario,)
                cursor.execute (consulta,valor)
                resultado_consulta = cursor.fetchone()
                if (resultado_consulta != nombre_del_usuario):
                    self.username = nombre_del_usuario 
                    print("Este usuario no existe")
                    break
                else:
                    print ("Este usuario ya existe, intente nuevamente")
            while True:
                contrasena = input ("Ingrese una contrasena: ")
                repetir_contrasena = input ("Repita la contrasena: ")
                if contrasena == repetir_contrasena:
                    self.contrasena = contrasena
                    break
                else:
                    print ("Las contrasenas deben coincidir")                
            nombre = input ("Ingrese su nombre: ")
            self.nombre = nombre
            apellido = input ("Ingrese su apellido: ")
            self.apellido = apellido
            dni = int(input ("Ingrese su D.N.I.: "))
            self.dni = dni
            fecha_de_nacimiento = input ("Ingrese su fecha de nacimiento en formato dd/mm/aaaa : ")
            fecha_de_nacimiento = datetime.datetime.strptime(fecha_de_nacimiento, '%d/%m/%Y').strftime('%Y-%m-%d')
            self.fecha_de_nacimiento = fecha_de_nacimiento 
            nro_telefonico = int(input ("Ingrese su numero de telefono: "))
            self.nro_telefonico = nro_telefonico
            email = input ("Ingrese su email.com: ")
            self.email = email
            fecha_registro = datetime.date.today()
            self.fecha_registro = fecha_registro
            while True:
                print ("Usted es: \n 1- Cliente \n 2- Administrador")
                opcion = int(input(Decoradores.opcion))
                if (opcion == 1 or opcion == 2):
                    if opcion == 1:
                        rol = "cliente"
                        self.rol = rol
                        break
                        
                    elif opcion == 2:
                        contrasena_admin = "admin"
                        contrasena_entrada= input ("Ingrese el codigo proporcionado por la empresa: ")
                        if contrasena_admin == contrasena_entrada:
                            rol = "administrador"
                            self.rol = rol
                            break
                        else:
                            print ("Codigo incorrecto, sera designado como cliente")
                            rol = "cliente"
                            break    
                else:
                    print(Decoradores.erroneo)
            
            
            # Consulta SQL para insertar datos en la tabla "usuarios"
            consulta_usuarios = "INSERT INTO usuarios (username, contrasena, nombre, apellido, dni, fecha_de_nacimiento, direccion, fecha_registro, nro_telefonico, email) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            valores_usuarios = (self.username, self.contrasena, self.nombre, self.apellido, self.dni, self.fecha_de_nacimiento, self.domicilio ,self.fecha_registro, self.nro_telefonico, self.email)

            # Ejecutar la consulta de "usuarios" y luego la de "codigo_postal" 
            cursor.execute(consulta_usuarios, valores_usuarios)
            # cursor.execute(consulta_codigo_postal, valores_codigo_postal)
            
            # Consulta SQL para encontrar el id en la tabla roles 
            consulta = ("SELECT id_roles FROM roles WHERE rol = %s")
            valor= (self.rol,)
            cursor.execute(consulta,valor)
            
            # Recupera el id de roles
            resultado = cursor.fetchone()
            id_cliente = resultado[0]
            
            # Consulta SQL para encontrar el id en la tabla usuario 
            consulta = ("SELECT id_usuarios FROM usuarios WHERE  username = %s")
            valor = (self.username,)
            cursor.execute(consulta,valor)
            
            # Recupera el id de usuario
            resultado = cursor.fetchone()
            id_usuario = resultado[0]
            
            # Consulta SQL para insertar datos en la tabla "usuario_roles"
            consulta_usuario_roles = "INSERT INTO usuario_roles (id_usuarios, id_roles) VALUES (%s, %s)"
            valores_usuario_roles = (id_usuario,id_cliente)

            # Ejecutar la consulta de "usuario_roles"
            cursor.execute(consulta_usuario_roles, valores_usuario_roles)

            # Confirmar los cambios en la base de datos
            conexion.confirmar_cambios()

            # Cerrar la conexión a la base de datos
            conexion.cerrar_base()

            print("Usuario registrado exitosamente")
                
    def mostrar_usuario(self,username):
        # Iniciar la base de datos
        conexion = BBDD.BaseDeDatos("localhost", "root", "Franco4567", "tecnoxpress", "3306")
        cursor = conexion.cursor()

        
        # Consulta SQL para recuperar los datos del usuario, incluyendo localidad y provincia
        consulta = "SELECT username, nombre, apellido, dni, fecha_de_nacimiento, nro_telefonico, email  FROM usuarios WHERE username = %s"
        valor = (username,)
        cursor.execute(consulta, valor)
        resultado_consulta_usuario = cursor.fetchone()
        
        if resultado_consulta_usuario :
            # Mostrar los datos del usuario
            print("Datos del usuario:")
            print("Usuario:", resultado_consulta_usuario[0])
            print("Nombre:", resultado_consulta_usuario[1])
            print("Apellido:", resultado_consulta_usuario[2])
            print("DNI:", resultado_consulta_usuario[3])
            fecha_nacimiento =  resultado_consulta_usuario[4]
            fecha_formateada = fecha_nacimiento.strftime('%d/%m/%Y')
            print("Fecha de Nacimiento:", fecha_formateada)
            print("Número Telefónico:", resultado_consulta_usuario[5])
            print("Email:", resultado_consulta_usuario[6])
            
        else:
            print("Usuario no encontrado")

        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()

    def eliminar_usuario(self,username):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        consulta = "SELECT id_usuarios FROM usuarios WHERE username = %s"
        valor = (username,)
        cursor.execute(consulta,valor)
        resultado_consulta = cursor.fetchone()
        
        consulta = "INSERT INTO usuario_eliminado (id_usuarios, usuario_eliminado) VALUES (%s, %s)"
        valor = (resultado_consulta[0], username)
        cursor.execute(consulta, valor)
        
        print ("Usuario eliminado exitosamente")
        
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
        
    def modificar_usuario(self,username, campo,nuevo_valor ):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        #Ejecutamos la actualizacion    
        consulta = "UPDATE usuarios SET {} = %s WHERE username = %s " .format (campo)  
        valor = (nuevo_valor, username)
        cursor.execute(consulta, valor) 
            
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
        
    def verificar_contrasena_actual (self, username ):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        #Verificamos en la base de datos
        consulta = "Select contrasena FROM usuarios WHERE username = %s"
        valor = (username,)
        cursor.execute(consulta,valor)
        resultado_consulta = cursor.fetchone()
        
        #Comprobamos la igualdad
        while True:
            contrasena_actual = input ("Ingrese su contrasena actual: ")
            if contrasena_actual == resultado_consulta [0] :
                return 
            else :
                print ("contrasena incorrecta")
     
    def ser_administrador (self, username, nuevo_valor):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        consulta = "Select id_roles FROM roles WHERE rol = %s"
        valor = (nuevo_valor,)
        cursor.execute(consulta,valor)
        resultado_consulta_rol = cursor.fetchone()            
        
        consulta = "Select id_usuarios FROM usuarios WHERE username = %s"
        valor = (username,)
        cursor.execute(consulta,valor)
        resultado_consulta_usuario = cursor.fetchone()
        
        consulta = "UPDATE usuario_roles SET id_roles= %s WHERE id_usuarios = %s"
        valor = (resultado_consulta_rol[0], resultado_consulta_usuario[0])
        cursor.execute(consulta,valor)
        resultado_consulta_rol = cursor.fetchone()
        
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
                    
        
    def cargar_datos_envios (self, username):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        # Agregamos la direccion del usuario a la base de datos
        direccion = input ("Ingrese su direccion: ")
        consulta = "UPDATE usuarios SET direccion = %s where username = %s"
        valores = (direccion , username,)
        cursor.execute(consulta,valores)
        
        # Consultamos cual es esa direccion en la base de datos
        consulta = "SELECT direccion, id_usuarios FROM usuarios where username = %s"
        valor = (username,)
        cursor.execute(consulta,valor)
        resultado_direccion = cursor.fetchone()
        
        # Consultamos cual es el codigo postal del usuario en la base de datos y buscamos la localidad del mismo
        codigo_postal =  int (input("Ingrese su codigo postal: ") )
        consulta = "SELECT id_provincia, localidad, codigo_postal, id_codigo_postal FROM codigo_postal WHERE codigo_postal= %s LIMIT 1"
        valor = (codigo_postal,)
        cursor.execute(consulta,valor)
        resultado_codigo_postal = cursor.fetchone()
        
        #Buscamos la provincia del usuario
        consulta = "SELECT provincia FROM provincia WHERE id_provincia = %s"
        valor = (resultado_codigo_postal [0],)
        cursor.execute(consulta,valor)
        resultado_provincia = cursor.fetchone()
        
        #Establecemos la relacion entre el usuario y el codigo postal
        consulta = "UPDATE envios SET id_usuarios = %s , id_codigo_postal = %s"
        valores = (resultado_direccion [1],resultado_codigo_postal[3])
        cursor.execute(consulta,valores)
        
        print ("Sus envios seran despachados hacia la direccion {} en la localidad de {} de la provincia de {}. \n Codigo postal: {} \n Muchas gracias ".format (resultado_direccion [0],resultado_codigo_postal[1],resultado_provincia[0],resultado_codigo_postal[2]))
        
        
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
                    
    def mostrar_datos_envios (self,username):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        # Consultamos cual es esa direccion en la base de datos
        consulta = "SELECT direccion, id_usuarios FROM usuarios where username = %s"
        valor = (username,)
        cursor.execute(consulta,valor)
        resultado_direccion = cursor.fetchone()
        
        if resultado_direccion [0] == "":
            print ("Primero debe cargar una direccion (Opcion 3).")
            return
        
        # Consultamos cual es el codigo postal del usuario 
        consulta = "SELECT id_codigo_postal FROM envios WHERE id_usuarios= %s "
        valor = (resultado_direccion[1], )
        cursor.execute(consulta,valor)
        resultado_envio = cursor.fetchone()
        
        #Buscamos la localidad del usuario 
        consulta = "SELECT id_provincia, localidad, codigo_postal  FROM codigo_postal WHERE id_codigo_postal= %s "
        valor = (resultado_envio)
        cursor.execute(consulta,valor)
        resultado_codigo_postal = cursor.fetchone()
        
        #Buscamos la provincia del usuario
        consulta = "SELECT provincia FROM provincia WHERE id_provincia = %s"
        valor = (resultado_codigo_postal [0],)
        cursor.execute(consulta,valor)
        resultado_provincia = cursor.fetchone()
        
        print ("Sus envios seran despachados hacia la direccion {} en la localidad de {} de la provincia de {}. \n Codigo postal: {}  ".format (resultado_direccion[0],resultado_codigo_postal[1],resultado_provincia[0],resultado_codigo_postal[2]))
         
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()   
        
    def modificar_datos_envios (self, username, campo, nuevo_valor, nuevo_valor_postal):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        #Ejecutamos la actualizacion    
        consulta = "UPDATE usuarios SET {} = %s WHERE username = %s " .format (campo)  
        valor = (nuevo_valor, username)
        cursor.execute(consulta, valor) 
        
        # Consultamos cual es esa direccion en la base de datos
        consulta = "SELECT direccion, id_usuarios FROM usuarios where username = %s"
        valor = (username,)
        cursor.execute(consulta,valor)
        resultado_direccion = cursor.fetchone()
        
        # Consultamos cual es el codigo postal del usuario en la base de datos y buscamos la localidad del mismo
        consulta = "SELECT id_provincia, localidad, codigo_postal, id_codigo_postal FROM codigo_postal WHERE codigo_postal= %s LIMIT 1"
        valor = (nuevo_valor_postal,)
        cursor.execute(consulta,valor)
        resultado_codigo_postal = cursor.fetchone()
        
        #Buscamos la provincia del usuario
        consulta = "SELECT provincia FROM provincia WHERE id_provincia = %s"
        valor = (resultado_codigo_postal [0],)
        cursor.execute(consulta,valor)
        resultado_provincia = cursor.fetchone()
        
        #Establecemos la relacion entre el usuario y el codigo postal
        consulta = "UPDATE envios SET id_codigo_postal= %s WHERE id_usuarios = %s"
        valor = (resultado_codigo_postal[3],resultado_direccion [1])
        cursor.execute(consulta,valor)
        
        print ("Sus envios seren despachados hacia la direccion {} en la localidad de {} de la provincia de {}. \n Codigo postal: {} ".format (resultado_direccion [0],resultado_codigo_postal[1],resultado_provincia[0],resultado_codigo_postal[2]))
        
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
                          
    def es_administrador(self, username):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        consulta_usuario = "SELECT id_usuarios FROM usuarios WHERE username = %s"
        valor_usuario = (username,)
        cursor.execute(consulta_usuario, valor_usuario)
        resultado_usuario = cursor.fetchone()
        
        consulta_roles = "SELECT id_roles FROM usuario_roles WHERE id_usuarios = %s"
        cursor.execute(consulta_roles, (resultado_usuario[0],))
        resultado_roles = cursor.fetchone()
        
        consulta_rol = "SELECT rol FROM roles WHERE id_roles = %s"
        cursor.execute (consulta_rol, (resultado_roles[0],))
        resultado_rol = cursor.fetchone ()
        
        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
                          
        
        if resultado_rol is not None and resultado_rol[0] == 'administrador':
            return True
        return False
    
    def inicio_usuario (self):
        self.contador = 1
        
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
            
        while (True):    
            usuario_registrado = input ("Ingrese su usuario: ")
            contrasena = input ("ingrese la contrasena: ")
            # Ver si el usuario es unico
            consulta = "SELECT usuario_eliminado FROM usuario_eliminado WHERE usuario_eliminado =  %s"
            valor = (usuario_registrado,)
            cursor.execute (consulta,valor)
            resultado_consulta = cursor.fetchone()
            if resultado_consulta is None :
                # Consultar la base de datos para verificar las credenciales
                consulta = "SELECT username, contrasena FROM usuarios WHERE username = %s AND contrasena = %s"
                valores = (usuario_registrado, contrasena)
                cursor.execute(consulta, valores)
                resultado_consulta_usuario = cursor.fetchone()
                
                if resultado_consulta_usuario is None:
                    if self.contador == 3:
                        print ("Limites de intentos superados")
                        print (Decoradores.cierre)
                        # Confirmar los cambios en la base de datos
                        conexion.confirmar_cambios()
                        # Cerrar la conexión a la base de datos
                        conexion.cerrar_base()
                        sys.exit()
                    else :
                        print("Usuario o contrasena incorrectas. Inténtalo de nuevo.")
                        self.contador += 1
                
                elif resultado_consulta_usuario [0] == usuario_registrado and resultado_consulta_usuario [1] == contrasena:
                    print (Decoradores.decorador)
                    print("Inicio de sesión exitoso. Bienvenido,", usuario_registrado)
                    print (Decoradores.decorador)
                    # Confirmar los cambios en la base de datos
                    conexion.confirmar_cambios()

                    # Cerrar la conexión a la base de datos
                    conexion.cerrar_base()
                    return usuario_registrado
                    
            elif (resultado_consulta [0] == usuario_registrado):
                print (Decoradores.decorador)
                print("El usuario {} fue eliminado. Intente con otro usuario" .format (usuario_registrado))
                print (Decoradores.decorador)
                # Confirmar los cambios en la base de datos
                conexion.confirmar_cambios()

                # Cerrar la conexión a la base de datos
                conexion.cerrar_base()
                sys.exit()
        
         
        
        
        