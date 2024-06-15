
// Modelo de Pedido
export interface Pedido {
  id?: string;
  id_User: string;
  nombre: string;
  direccion: string;
  tarjeta: string;
  exp: string;
  cvv: string;
  carrito: { producto: any, cantidad: number }[];
  total: number;
  fechaPago: string; 
  estado: string; 
}
