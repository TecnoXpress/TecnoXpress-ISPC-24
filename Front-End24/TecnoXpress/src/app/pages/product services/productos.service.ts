import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../productos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  public apiUrl: string = 'http://localhost:3000/productos';

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
}









