import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { User } from '../registrar/user.model';
import { ToastrService } from 'ngx-toastr';
import { map, catchError } from 'rxjs/operators';
import { Pedido } from '../../checkout/Model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, @Inject(ToastrService) private toastr: ToastrService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getCurrentUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private getCurrentUserFromStorage(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      map(response => {
        this.toastr.success('Registro exitoso');
        return response;
      }),
      catchError(error => {
        this.toastr.error('Error en el registro: ' + error.message);
        return throwError(error);
      })
    );
  }

  login(nombreUsuario: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}/users?nombreUsuario=${nombreUsuario}&password=${password}`).pipe(
      map(users => {
        if (users && users.length > 0) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.toastr.success('Inicio de sesión exitoso');
          return user;
        } else {
          this.toastr.error('Usuario o contraseña incorrectos');
          throw new Error('Usuario o contraseña incorrectos');
        }
      }),
      catchError(error => {
        console.error('Error en el servidor:', error);
        this.toastr.error('Error en el servidor. Intente nuevamente más tarde.');
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.toastr.info('Cierre de sesión exitoso');
  }

  getPedidos(userId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/pedidos?id_User=${userId}`);
  }
}




















  


