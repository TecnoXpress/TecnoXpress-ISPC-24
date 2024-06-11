import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../registrar/user.model';
import { ToastrService } from 'ngx-toastr';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-registrar',
  standalone: true,
  templateUrl: 'registrar.component.html',
  styleUrls: ['registrar.component.css'],
  imports: [CommonModule, ReactiveFormsModule, NgIf],
})
export class RegistrarComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(ToastrService) private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(20)]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      fechaNacimiento: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Getters for form controls
  get Email() { return this.registerForm.get('email'); }
  get Nombre() { return this.registerForm.get('nombre'); }
  get NombreUsuario() { return this.registerForm.get('nombreUsuario'); }
  get Apellido() { return this.registerForm.get('apellido'); }
  get Telefono() { return this.registerForm.get('telefono'); }
  get Dni() { return this.registerForm.get('dni'); }
  get FechaNacimiento() { return this.registerForm.get('fechaNacimiento'); }
  get Password() { return this.registerForm.get('password'); }
  get ConfirmPassword() { return this.registerForm.get('confirmPassword'); }

  passwordMatchValidator(group: FormGroup): { passwordMismatch: boolean } | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    } else {
      return null;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  registrar(): void {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.authService.register(user).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.toastr.success('El registro se ha creado satisfactoriamente. ¡A continuación!, inicie sesión');
          this.router.navigate(['/iniciar-sesion']);
        },
        error => {
          console.error('Registration error:', error);
          this.toastr.error('Error en el registro: ' + error.message);
        }
      );
    } else {
      this.toastr.warning('Por favor, complete todos los campos correctamente.');
    }
  }
}



























