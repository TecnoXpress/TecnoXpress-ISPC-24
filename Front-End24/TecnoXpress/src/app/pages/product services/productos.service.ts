import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Producto } from '../productos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public apiUrl: string = 'http://localhost:3000/productos';

  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>(this.carrito);
  private totalSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductosPorCategorias(id_categoria_productos: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?categoria.id_categoria_productos=${id_categoria_productos}`);
  }

  getProductoPorId(id: string): Observable<Producto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  agregarProductoAlCarrito(producto: Producto) {
    this.carrito.push(producto);
    this.carritoSubject.next(this.carrito);
    this.updateTotal();
  }

  obtenerCarrito(): Observable<Producto[]> {
    return this.carritoSubject.asObservable();
  }

  obtenerTotal(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  removerProductoDelCarrito(producto: Producto) {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
    this.carritoSubject.next(this.carrito);
    this.updateTotal();
  }

  vaciarCarrito() {
    this.carrito = [];
    this.carritoSubject.next(this.carrito);
    this.totalSubject.next(0);
  }

  private updateTotal() {
    const total = this.carrito.reduce((acc, producto) => acc + producto.precio, 0);
    this.totalSubject.next(total);
  }
}










