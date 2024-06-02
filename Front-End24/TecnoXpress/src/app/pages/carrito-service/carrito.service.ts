import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../productos/producto.model';
import { CarritoComponent } from '../carrito/carrito.component';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosCarrito: Producto[] = [];
  private numeroProductosSubject = new BehaviorSubject<number>(0);

  constructor() {
    // Cargar productos del localStorage si existen
    const productosGuardados = localStorage.getItem('productos-en-carrito');
    if (productosGuardados) {
      this.productosCarrito = JSON.parse(productosGuardados);
      this.actualizarNumeroProductos();
    }
  }

  obtenerProductosCarrito(): Producto[] {
    return this.productosCarrito;
  }

  obtenerNumeroProductos() {
    return this.numeroProductosSubject.asObservable();
  }

  agregarProducto(productoId: string) {
    const productoExistente = this.productosCarrito.find(p => p.id_productos === productoId);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      // Aquí debes obtener los detalles del producto (nombre, precio, imagen, etc.)
      // Puedes hacerlo desde un servicio de productos o desde un arreglo local
      const nuevoProducto: Producto = {
        id_productos: productoId,
        nombre: 'Nombre del producto', // Reemplaza con los datos reales
        precio: 100, // Reemplaza con los datos reales
        imagen: 'ruta/de/la/imagen', // Reemplaza con los datos reales
        cantidad: 1,
        id: 0,
        descripcion: '',
        titulo: '',
        categoria: {
          id_categoria_productos:'',
          nombre:'Nombre'
        },
        stock: 0
      };
      this.productosCarrito.push(nuevoProducto);
    }
    this.actualizarNumeroProductos();
    this.guardarEnLocalStorage();
  }

  eliminarProducto(producto: Producto) {
    const index = this.productosCarrito.findIndex(p => p.id_productos === producto.id_productos);
    if (index > -1) {
      this.productosCarrito.splice(index, 1);
      this.actualizarNumeroProductos();
      this.guardarEnLocalStorage();
    }
  }

  vaciarCarrito() {
    this.productosCarrito = [];
    this.actualizarNumeroProductos();
    this.guardarEnLocalStorage();
  }

  calcularTotal(): number {
    return this.productosCarrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  }

  private actualizarNumeroProductos() {
    this.numeroProductosSubject.next(this.productosCarrito.length);
  }

  private guardarEnLocalStorage() {
    localStorage.setItem('productos-en-carrito', JSON.stringify(this.productosCarrito));
  }
}
