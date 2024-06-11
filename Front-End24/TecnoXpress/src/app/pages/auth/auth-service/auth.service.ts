import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../registrar/user.model';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Pedido } from '../../checkout/Model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
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
    return this.http.post<User>(`${this.apiUrl}`, user).pipe(
      map(response => {
        this.toastr.success('Registro exitoso');
        return response;
      })
    );
  }

  login(nombreUsuario: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.apiUrl}?nombreUsuario=${nombreUsuario}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.toastr.success('Inicio de sesión exitoso');
          return user;
        } else {
          this.toastr.error('Usuario o contraseña incorrectos');
          throw new Error('Usuario o contraseña incorrectos');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.toastr.info('Cierre de sesión exitoso');
  }

  getPedidos(userId: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`http://localhost:3000/pedidos?userId=${userId}`);
  }
  
}
















  


