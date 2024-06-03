import BBDD
import Decoradores

class Producto:
    def __init__(self):
        self.nombre = ""
        self.descripcion = ""
        self.precio = ""
        self.stock = ""
        self.id_categoria_productos = ""
        self.url_imagen = ""



    def agregar_producto(self):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()


        print("\n╔══════════════════════════════╗")
        print("║      Agregar Producto          ║")
        print("╚══════════════════════════════╝")
        
        nombre = input(' Por favor escriba el nombre del Producto: ')
        descripcion = input('Escriba una descripción del Producto: ')
        precio = float(input(' Introduce el precio del Producto (solo en digitos): '))
        stock = int(input('Introduzca la cantidad de stock del Producto (digitos): '))
        # id_categoria_productos = int(input('ID de la Categoría del Producto: '))
        url_imagen = input('URL de la Imagen del Producto: ')
        # producto = Producto( nombre, descripcion, precio, stock, id_categoria_productos, url_imagen)
        
        while True :
            print ("¿Que categoria es? \n 1- Mouses \n 2- Teclado \n 3- Monitores")
            opcion = int(input (Decoradores.opcion))
            if (opcion >= 1 and opcion <= 3):
                if opcion == 1:
                    categoria = "mouses"
                    break
                elif opcion == 2:
                    categoria = "teclado"
                    break
                elif opcion == 3 :
                    categoria = "monitores"
                    break
                    
            else:
                print(Decoradores.erroneo)

        consulta_categoria = "SELECT id_categoria_productos FROM categoria_productos WHERE tipo = %s "
        valor_categoria = (categoria,)
        cursor.execute (consulta_categoria,valor_categoria)
        resultado_categoria = cursor.fetchone ()
        cursor.fetchall()
        
        # Consulta SQL para insertar datos en la tabla "usuarios"
        consulta_productos = "INSERT INTO productos (nombre, descripcion, imagen_url, precio, stock, id_categoria_productos ) VALUES (%s, %s, %s, %s, %s,%s)"
        valores_productos = (nombre, descripcion, url_imagen, precio, stock, resultado_categoria [0])
        cursor.execute(consulta_productos,valores_productos)
        
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()

        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
        
        
        print(f' El producto "{nombre}" se ha agregado correctamente.')


    def listar_productos(self):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()

        cursor.execute("SELECT id_productos, nombre, precio FROM productos ")
        resultado_productos = cursor.fetchall()

        print("\n╔══════════════════════════════╗")
        print("║       Lista de Productos       ║")
        print("╚══════════════════════════════╝")

        if resultado_productos is None or len(resultado_productos) == 0:
            print("Actualmente no hay productos disponibles.")
        else:
            for producto in resultado_productos:
                id_producto, nombre, precio = producto
                print(f'{id_producto}- {nombre}  $ {precio}')

        # Cierra la conexión a la base de datos
        conexion.cerrar_base()


    def modificar_producto(self):
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        cursor.execute("SELECT id_productos, nombre FROM productos ")
        resultado_productos = cursor.fetchall()

        print("\n╔══════════════════════════════╗")
        print("║       Lista de Productos       ║")
        print("╚══════════════════════════════╝")

        if resultado_productos is None or len(resultado_productos) == 0:
            print("Actualmente no hay productos disponibles.")
        else:
            for producto in resultado_productos:
                id_producto, nombre = producto
                print(f'{id_producto}- {nombre}')

        print("\n╔══════════════════════════════╗")
        print("║    Modificar Producto          ║")
        print("╚══════════════════════════════╝")
        id_productos = int(input(' Por favor, introduce la opcion del Producto a Modificar: '))

        # Consulta SQL para seleccionar el producto
        consulta_producto = "SELECT nombre, descripcion, precio, stock, id_categoria_productos, imagen_url FROM productos WHERE id_productos = %s"
        valor_producto = (id_productos,)
        cursor.execute(consulta_producto, valor_producto)
        producto = cursor.fetchone()
        cursor.fetchall()

        if producto is not None:
            nombre = input(' Coloque un nuevo nombre del Producto: ')
            descripcion = input(' Coloque una nueva descripción del producto: ')
            precio = float(input(' Indique el nuevo precio del producto (solo números): '))
            stock = int(input(' Nuevo Stock del Producto (solo números): '))
            while True :
                print ("¿Que categoria es? \n 1- Mouses \n 2- Teclados \n 3- Monitores")
                opcion = int(input (Decoradores.opcion))
                if (opcion >= 1 and opcion <= 3):
                    if opcion == 1:
                        categoria = "mouses"
                        break
                    elif opcion == 2:
                        categoria = "teclados"
                        break
                    elif opcion == 3 :
                        categoria = "monitores"
                        break
                        
                else:
                    print(Decoradores.erroneo)
                    
            consulta_categoria = "SELECT id_categoria_productos FROM categoria_productos WHERE tipo = %s "
            valor_categoria = (categoria,)
            cursor.execute (consulta_categoria,valor_categoria)
            resultado_categoria = cursor.fetchone ()
            id_categoria_productos = resultado_categoria
            url_imagen = input('Nueva URL de la Imagen del Producto: ')
            cursor.fetchall()
            
            # Consulta SQL para actualizar el producto
            consulta_actualizar = "UPDATE productos SET nombre = %s, descripcion = %s, precio = %s, stock = %s, id_categoria_productos = %s, imagen_url = %s WHERE id_productos = %s"
            valores_actualizar = (nombre, descripcion, precio, stock, id_categoria_productos[0], url_imagen, id_productos )
            cursor.execute(consulta_actualizar, valores_actualizar)
            conexion.confirmar_cambios()
            print(f'El producto {producto[0]} modificado correctamente.')
        else:
            print(Decoradores.erroneo)
        
        # Confirmar los cambios en la base de datos
        conexion.confirmar_cambios()
        
        # Cerrar la conexión a la base de datos
        conexion.cerrar_base()
        

    def borrar_producto(self):
        print("\n╔══════════════════════════════╗")
        print("║       Borrar Producto          ║")
        print("╚════════════════════════════════╝")
    
        # Iniciamos la base de datos
        conexion = BBDD.BaseDeDatos()
        cursor = conexion.cursor()
        
        cursor.execute("SELECT id_productos, nombre FROM productos ")
        resultado_productos = cursor.fetchall()

        print("\n╔══════════════════════════════╗")
        print("║       Lista de Productos       ║")
        print("╚══════════════════════════════╝")

        if resultado_productos is None or len(resultado_productos) == 0:
            print("Actualmente no hay productos disponibles.")
        else:
            for producto in resultado_productos:
                id_producto, nombre = producto
                print(f'{id_producto}- {nombre}')

        # Obtener el ID del producto 
        id_producto = int(input('Elegi el producto a Eliminar: '))

        # Consulta SQL para eliminar el producto
        consulta_eliminar = "DELETE FROM productos WHERE id_productos = %s"
        valor_eliminar = (id_producto,)
        cursor.execute(consulta_eliminar, valor_eliminar)
        conexion.confirmar_cambios()

        # Verificar si se eliminó el producto
        if cursor.rowcount > 0:
            print(f'Producto con ID {id_producto} eliminado correctamente.')
        else:
            print(f'No se encontró producto con ID {id_producto}.')

        # Cierra la conexión a la base de datos
        conexion.cerrar_base()
