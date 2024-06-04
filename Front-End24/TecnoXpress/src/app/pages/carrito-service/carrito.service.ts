
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../productos/producto.model';

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

  agregarProducto(productoId: number) {
    const productoExistente = this.productosCarrito.find(p => p.id === productoId);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      // Aquí debes obtener los detalles del producto (nombre, precio, imagen, etc.)
      // Puedes hacerlo desde un servicio de productos o desde un arreglo local
      const nuevoProducto: Producto = {
        id: productoId,
        nombre: 'Nombre del producto', // Reemplaza con los datos reales
        precio: 100, // Reemplaza con los datos reales
        imagen: 'ruta/de/la/imagen', // Reemplaza con los datos reales
        cantidad: 1,
        descripcion: '',
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
    const index = this.productosCarrito.findIndex(p => p.id === producto.id);
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

  cargarProductosCarrito(productos: Producto[], contenedor: HTMLElement) {
    if (productos && productos.length > 0) {
      contenedor.innerHTML = ""; 

      productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
          <img class="carrito-producto-imagen img-fluid" src="${producto.imagen}" alt="${producto.nombre}">
          <div class="carrito-producto-titulo">
            <small>Título</small>
            <h3>${producto.nombre}</h3>
          </div>
          <div class="carrito-producto-cantidad">
            <small>Cantidad</small>
            <p>${producto.cantidad}</p>
          </div>
          <div class="carrito-producto-precio">
            <small>Precio</small>
            <p>${producto.precio}</p>
          </div>
          <div class="carrito-producto-subtotal">
            <small>Subtotal</small>
            <p>${producto.precio * producto.cantidad}</p>
          </div>
          <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
        `;
        contenedor.append(div);
      }); 
    } else {
      contenedor.innerHTML = '<p>El carrito está vacío</p>';
    }
  }
}