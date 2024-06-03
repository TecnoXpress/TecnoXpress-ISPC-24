import Decoradores
from Usuario import Usuario
from Producto import Producto
import sys
import datetime
from BBDD import BaseDeDatos



# Menu de ingreso
def menu_inicial():
    while True:
            opcion = int(input(Decoradores.opcion))
            if (opcion >= 0 and opcion <= 2):
                if opcion == 1:
                    usuario = Usuario ()
                    username = usuario.inicio_usuario()
                    menu_usuario (username)                                
                    break
                elif opcion == 2:
                    usuario = Usuario()  
                    username = usuario.cargar_usuario()
                    menu_usuario(username) 
                    break

                elif opcion == 0:
                    print(Decoradores.closer)
                    print(Decoradores.decorador)
                    sys.exit ()
            else:
                print(Decoradores.erroneo)
                
#Menu de usuario
def menu_usuario (username):
    
    while True:
            print (Decoradores.menu_usuario)
            print("\nElija una opción :\n 1- Mis datos \n 2- Modificar datos \n 3- Ingresar datos de envio \n 4- Mostrar datos de envios \n 5- Comprar \n 6- Ver productos \n 7- Eliminar usuario \n 0- Salir de la Aplicación.\n")
            opcion = int(input(Decoradores.opcion))
            if (opcion >= 0 and opcion <= 6):
                if opcion == 1:
                    usuario = Usuario ()
                    usuario.mostrar_usuario(username)
                    while True:
                        print ("0- Volver al menu de usuario")
                        opcion = int(input(Decoradores.opcion))
                        if opcion == 0:
                            break
                        print ("Ingrese 0 si quiere volver al menu de usuario")
                    
                elif opcion == 2:
                    usuario = Usuario() 
                    menu_actualizacion (username)
                    
                elif opcion == 3:
                    usuario = Usuario ()
                    usuario.cargar_datos_envios(username)
                    while True:
                        print ("0- Volver al menu de usuario")
                        opcion = int(input(Decoradores.opcion))
                        if opcion == 0:
                            break
                        print ("Ingrese 0 si quiere volver al menu de usuario")
                    
                elif opcion == 4:
                    usuario = Usuario ()
                    usuario.mostrar_datos_envios(username)
                    while True:
                        print ("0- Volver al menu de usuario")
                        opcion = int(input(Decoradores.opcion))
                        if opcion == 0:
                            break
                        print ("Ingrese 0 si quiere volver al menu de usuario")
                elif opcion == 5:
                    print ("Disculpe esta seccion esta en mantenimiento")
                    
                elif opcion == 6:
                    menu_productos (username)
                    
                elif opcion == 7:
                    usuario = Usuario ()
                    usuario.eliminar_usuario(username)
                    sys.exit()

                elif opcion == 0:
                    print(Decoradores.cierre)
                    print(Decoradores.decorador)
                    break
            else:
                print(Decoradores.erroneo)

def menu_actualizacion (username):
    print (Decoradores.decorador)
    print ("¿Que dato desea modificar?")
    print("\nElija el campo a modificar:\n 1- Usuario\n 2- Contraseña\n 3- Nombre\n 4- Apellido\n 5- Fecha de nacimiento \n 6- Numero telefonico \n 7- Email \n 8-  Modificar datos de envios \n 9- Ser administrador \n 0- Salir\n")
    print (Decoradores.decorador)
    while True:
        opcion = int(input(Decoradores.opcion))
        if opcion >= 0 and opcion <= 9:
            modificarCampos(opcion, username)
            break
        else:
            print(Decoradores.erroneo)
            
def modificarCampos(opcion, username):
    while True:
        if opcion == 1:
            campo = "username"
            nuevo_valor = input("Ingrese el nuevo usuario: ")
            usuario = Usuario() 
            usuario.modificar_usuario (username ,campo, nuevo_valor)
            print(Decoradores.correcto)
            sys.exit()
            
        elif opcion == 2:
            usuario = Usuario() 
            usuario.verificar_contraseña_actual( username )
            campo = "contraseña"
            while True:
                nuevo_valor = input("Ingrese la nueva contraseña: ")
                repetir_nueva_contraseña = input ("Repita la nueva contraseña: ")
                if nuevo_valor == repetir_nueva_contraseña:
                    usuario.modificar_usuario (username ,campo, nuevo_valor)
                    break
                else:
                    print ("Las contraseñas deben coincidir")
                    
            print(Decoradores.correcto)
            sys.exit() 
            
        elif opcion == 3:
            campo = "nombre"
            nuevo_valor = input("Ingrese el nuevo nombre: ")
            usuario = Usuario() 
            usuario.modificar_usuario (username ,campo, nuevo_valor)
            print(Decoradores.correcto)
            break
            
        elif opcion == 4:
            campo = "apellido"
            nuevo_valor = input("Ingrese el nuevo apellido: ")
            usuario = Usuario() 
            usuario.modificar_usuario (username ,campo, nuevo_valor)
            print(Decoradores.correcto)
            break
                
        elif opcion == 5:
            campo = "fecha_de_nacimiento"
            nuevo_valor = input("Ingrese la nueva fecha de nacimiento en formato dd/mm/aaaa : ")
            nuevo_valor = datetime.datetime.strptime(nuevo_valor, '%d/%m/%Y').strftime('%Y-%m-%d')
            usuario = Usuario() 
            usuario.modificar_usuario (username ,campo, nuevo_valor)
            print(Decoradores.correcto)
            break
            
        elif opcion == 6:
            campo = "nro_telefonico"
            nuevo_valor = input("Ingrese su nuevo numero telefonico: ")
            usuario = Usuario() 
            usuario.modificar_usuario (username ,campo, nuevo_valor)
            print(Decoradores.correcto)
            break
            
        elif opcion == 7:
            campo = "email"
            nuevo_valor = input("Ingrese su nuevo email: ")
            usuario = Usuario() 
            usuario.modificar_usuario (username ,campo, nuevo_valor)
            print(Decoradores.correcto) 
            break
            
        elif opcion == 8:
            campo = "direccion"
            nuevo_valor = input("Ingrese su nueva direccion: ")
            nuevo_valor_postal = int (input("Ingrese el codigo postal: "))
            usuario = Usuario() 
            usuario.modificar_datos_envios (username ,campo, nuevo_valor,nuevo_valor_postal)
            print(Decoradores.correcto)
            break
        
        elif opcion == 9:
            admin = input ("Ingrese la contraseña suministrada por la empresa: ")
            contraseña_admin = "admin"
            nuevo_valor = "administrador"
            if admin == contraseña_admin:
                usuario = Usuario() 
                usuario.ser_administrador (username ,nuevo_valor)
                print(Decoradores.correcto)
                break
            else:
                print (Decoradores.decorador)
                print (Decoradores.erroneo)
                print (Decoradores.decorador)
                break 
                     
        
        elif opcion == 0:
            print (Decoradores.decorador)
            break
        
def menu_productos(username):
        usuario = Usuario() 
        admin = usuario.es_administrador (username)
        if admin is True:
            while True:
                print('╔═══════════════════════════════════════════╗')
                print('║            Menú de productos              ║')
                print('╠═══════════════════════════════════════════╣')
                print('║ 1. Agregar un nuevo producto              ║')
                print('║ 2. Listar todos los productos             ║')
                print('║ 3. Modificar producto                     ║')
                print('║ 4. Borrar Producto                        ║')
                print('║ 0. Volver                                 ║')
                print('╚═══════════════════════════════════════════╝')
                opcion = int(input(Decoradores.opcion)) 
                if opcion >= 0 and opcion <= 4:
                    if opcion == 1:
                        productos = Producto ()
                        productos.agregar_producto ()  
                        
                    elif opcion == 2:
                        productos = Producto ()
                        productos.listar_productos ()
                        
                    elif opcion == 3 :
                        productos = Producto ()
                        productos.modificar_producto ()
                       
                    elif opcion == 4 :
                        productos = Producto()
                        productos.borrar_producto ()
                        
                    elif opcion == 0 :
                        return
                else:
                    print (Decoradores.erroneo)
        else:
            while True:
                print('╔═══════════════════════════════════════════╗')
                print('║            Menú de productos              ║')
                print('╠═══════════════════════════════════════════╣')
                print('║ 1. Listar todos los productos             ║')
                print('║ 0. Volver                                 ║')
                print('╚═══════════════════════════════════════════╝')
                opcion = int(input(Decoradores.opcion)) 
                if opcion == 0 or opcion == 1:
                    if opcion == 1:
                        productos = Producto ()
                        productos.listar_productos ()
                        
                    elif opcion == 0 :
                        return
                
                else:
                    print (Decoradores.erroneo)
            
              
    
#Instanciamos la base de datos 
baseDeDatos = BaseDeDatos ()
# Verifica si la base de datos ya existe
if not baseDeDatos.base_de_datos_existe():
    # Si la base de datos no existe, créala
    baseDeDatos.crear_base_de_datos()

#Corremos el menu del programa
print(Decoradores.encabezado)
print("\nElija una opción :\n 1- Soy usuario \n 2- No soy usuario, quiero registrarme \n 0- Salir de la Aplicación.\n")
menu_inicial()        