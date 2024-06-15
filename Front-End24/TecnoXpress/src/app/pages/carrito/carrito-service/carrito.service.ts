import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../../productos/producto.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: { producto: Producto, cantidad: number }[] = [];
  private carritoSubject = new BehaviorSubject<{ producto: Producto, cantidad: number }[]>(this.carrito);
  private totalSubject = new BehaviorSubject<number>(0);
  private totalPrecioSubject = new BehaviorSubject<number>(0);

  constructor(private toastr: ToastrService) {}

  agregarProductoAlCarrito(producto: Producto): { success: boolean, message: string } {
    const itemExistente = this.carrito.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      if (itemExistente.cantidad < itemExistente.producto.stock) {
        itemExistente.cantidad++;
        this.carritoSubject.next(this.carrito);
        this.updateTotals();
        this.toastr.success(`${producto.nombre} ha sido agregado al carrito.`);
        return { success: true, message: `${producto.nombre} ha sido agregado al carrito.` };
      } else {
        this.toastr.error(`No hay más stock de ${producto.nombre}.`);
        return { success: false, message: `No hay más stock de ${producto.nombre}.` };
      }
    } else {
      if (producto.stock > 0) {
        this.carrito.push({ producto, cantidad: 1 });
        this.carritoSubject.next(this.carrito);
        this.updateTotals();
        this.toastr.success(`${producto.nombre} ha sido agregado al carrito.`);
        return { success: true, message: `${producto.nombre} ha sido agregado al carrito.` };
      } else {
        this.toastr.error(`No hay más stock de ${producto.nombre}.`);
        return { success: false, message: `No hay más stock de ${producto.nombre}.` };
      }
    }
  }

  obtenerCarrito(): Observable<{ producto: Producto, cantidad: number }[]> {
    return this.carritoSubject.asObservable();
  }

  obtenerTotalProductos(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  obtenerTotalPrecio(): Observable<number> {
    return this.totalPrecioSubject.asObservable();
  }

  removerProductoDelCarrito(producto: Producto): { success: boolean, message: string } {
    const itemExistente = this.carrito.find(item => item.producto.id === producto.id);
    if (itemExistente) {
      itemExistente.cantidad--;
      if (itemExistente.cantidad === 0) {
        this.carrito = this.carrito.filter(item => item.producto.id !== producto.id);
      }
      this.carritoSubject.next(this.carrito);
      this.updateTotals();
      this.toastr.info(`${producto.nombre} ha sido removido del carrito.`);
      return { success: true, message: `${producto.nombre} ha sido removido del carrito.` };
    } else {
      this.toastr.error(`${producto.nombre} no se encuentra en el carrito.`);
      return { success: false, message: `${producto.nombre} no se encuentra en el carrito.` };
    }
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
    this.totalSubject.next(0);
    this.totalPrecioSubject.next(0);
    this.toastr.info('El carrito ha sido vaciado.');
  }

  private updateTotals(): void {
    const totalProductos = this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    this.totalSubject.next(totalProductos);

    const totalPrecio = this.carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
    this.totalPrecioSubject.next(totalPrecio);
  }
}

