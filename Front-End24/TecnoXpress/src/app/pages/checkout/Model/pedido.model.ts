// Modelo de Pedido
export interface Pedido {
  id: string;
  userId: string;
  nombre: string;
  direccion: string;
  tarjeta: string;
  exp: string;
  cvv: string;
  carrito: { producto: any, cantidad: number }[];
  total: number;
  fechaPago: string; // Nuevo campo para la fecha de pago
}
  