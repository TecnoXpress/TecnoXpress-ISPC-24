from datetime import datetime

class Pedido:
    def __init__(self, id_pedido, id_usuario, id_carrito):
        self.id_pedid = id_pedido
        self.id_usuario = id_usuario
        self.order_date = datetime.now()
        self.id_carrito = id_carrito
    
    def get_id_pedido(self):
        return self.id_pedido

    def set_id_pedido(self,id_pedido):
        self.id_pedido = id_pedido
    
    def get_id_usuario(self):
        return self.id_usuario

    def set_id_usuario(self,id_usuario):
        self.id_usuario = id_usuario
        
    def get_id_carrito(self):
        return self.id_carrito

    def set_id_carrito(self,id_carrito):
        self.id_carrito = id_carrito
    
    
    def cargar_pedido(self):
        # implementacion del metodo
        pass
    
    def modificar_pedido(self):
        # implementacion del metodo
        pass
    
    def eliminar_pedido(self):
        # implementacion del metodo
        pass
    
    