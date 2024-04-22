class Categoria:
    def __init__(self, categoria, producto, id_producto, tipo, stock):
        self._categoria = categoria
        self._producto = producto
        self._id_producto = id_producto
        self._tipo = tipo
        self._stock = stock

    @property
    def categoria(self):
        return self._categoria

    @categoria.setter
    def categoria(self, nueva_categoria):
        self._categoria = nueva_categoria

    @property
    def producto(self):
        return self._producto

    @producto.setter
    def producto(self, nuevo_producto):
        self._producto = nuevo_producto

    @property
    def id_producto(self):
        return self._id_producto

    @id_producto.setter
    def id_producto(self, nuevo_id_producto):
        self._id_producto = nuevo_id_producto

    @property
    def tipo(self):
        return self._tipo

    @tipo.setter
    def tipo(self, nuevo_tipo):
        self._tipo = nuevo_tipo

    @property
    def stock(self):
        return self._stock

    @stock.setter
    def stock(self, nuevo_stock):
        self._stock = nuevo_stock

    def cargar_categoria(self, categoria, producto, id_producto, tipo, stock):
        self.categoria = categoria
        self.producto = producto
        self.id_producto = id_producto
        self.tipo = tipo
        self.stock = stock

    def modificar_categoria(self, nueva_categoria, nuevo_producto, nuevo_id_producto, nuevo_tipo, nuevo_stock):
        self.categoria = nueva_categoria
        self.producto = nuevo_producto
        self.id_producto = nuevo_id_producto
        self.tipo = nuevo_tipo
        self.stock = nuevo_stock

    def mostrar_categoria(self):
        print(f"Categoría: {self.categoria}")
        print(f"Producto: {self.producto}")
        print(f"ID Producto: {self.id_producto}")
        print(f"Tipo: {self.tipo}")
        print(f"Stock: {self.stock}")


        #########

    def cargar_categoria(self):
        # para cargar una categoría de producto
        pass

    def modificar_categoria(self):
        # ara modificar una categoría de producto
        pass

    def mostrar_categoria(self):
        # para mostrar una categoría de producto
        pass

    def eliminar_categoria(self):
        # para eliminar una categoría de producto
        pass
