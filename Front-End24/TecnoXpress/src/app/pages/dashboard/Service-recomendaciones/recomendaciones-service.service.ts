import { Producto } from './../../productos/producto.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  private apiUrl = 'http://localhost:3000/recomendaciones';

  constructor(private http: HttpClient) { }

  getRecomendaciones(userId: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiUrl}?userId=${userId}`);
  }
}
