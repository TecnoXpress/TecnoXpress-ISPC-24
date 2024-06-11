import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, @Inject(ToastrService) private toastr: ToastrService) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      return true;
    } else {
      this.toastr.warning('Necesitas iniciar sesión para procesar el pago.');
      this.router.navigate(['/iniciar-sesion']);
      return false;
    }
  }
}


