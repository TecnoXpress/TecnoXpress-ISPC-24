import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../Model/pedido.model'; 

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:3000/pedidos';

  constructor(private http: HttpClient) { }

  procesarPago(datosPago: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, datosPago);
  }
}



