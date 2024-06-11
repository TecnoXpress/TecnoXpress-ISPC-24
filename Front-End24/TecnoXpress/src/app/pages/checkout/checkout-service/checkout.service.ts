import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }

  procesarPago(datosPago: any): Observable<any> {
    const url = 'http://localhost:3000/pedidos';
    return this.http.post<any>(url, datosPago);
  }
}




