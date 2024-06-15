import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    @Inject(ToastrService) private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    });
  }

  get nombreUsuario() {
    return this.loginForm.get('nombreUsuario');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  login(): void {
    if (this.loginForm.valid) {
      const { nombreUsuario, password } = this.loginForm.value;
      this.authService.login(nombreUsuario, password).subscribe(
        response => {
          console.log('Login successful:', response);
          this.toastr.success('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Login error:', error);
          this.toastr.error('Error en el inicio de sesión: ' + error.message);
        }
      );
    } else {
      this.toastr.warning('Por favor, complete todos los campos.');
    }
  }
}








