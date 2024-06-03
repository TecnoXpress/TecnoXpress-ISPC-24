class carrito_compra:
    def __init__(self, producto, usuario, factura, total):
        self.__producto = producto
        self.__usuario = usuario
        self.nro_factura = factura
        self.total = total

    def cargar_compra(self, producto, cantidad):
        pass

    def actualizar_stock(self, producto, cantidad):
        pass

    def mostrar_compra(self):
        pass

    def eliminar_compra(self, producto):
        pass

    def get_usuario(self):
        return self.__usuario

    def get_nro_factura(self):
        return self.nro_factura

    def get_total(self):
        return self.total

    def get_producto(self):
        return self.__producto
    
    def set_nuevo_usuario(self, nuevo_usuario):
        self.__usuario = nuevo_usuario

    def set_nuevo_nro_factura(self, nuevo_nro_factura):
        self.nro_factura = nuevo_nro_factura

    def set_nuevo_total(self, nuevo_total):
        self.total = nuevo_total

    def set_nuevo_producto(self, nuevo_producto):
        self.__producto = nuevo_producto