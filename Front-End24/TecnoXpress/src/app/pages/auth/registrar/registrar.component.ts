import { CommonModule, NgIf } from '@angular/common';
import { Component,OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../registrar/user.model';

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
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(20)]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      fechaNacimiento: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(11)]],
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
      return null;}}
////////////////////  funcion view///////////////////////////////////
      togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
      }
    
      toggleConfirmPasswordVisibility(): void {
        this.showConfirmPassword = !this.showConfirmPassword;
      }


       // Para el registro del usuario  forma 1 
   /*onEnviar(event: Event): void {
    event.preventDefault();
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        response => {
          console.log('Registration successful:', response);
          alert('El registro se ha creado satisfactoriamente. ¡A continuación!, inicie sesión'); // Muestra un mensaje de éxito
          this.router.navigate(['/iniciar-sesion'])
        },
        error => {
          console.error('Registration error:', error);
          alert('Registration error: ' + error.message); // Muestra un mensaje de error
        }
      ); 
    }  } */

    // Para el registro del usuario  forma 2

  registrar(): void {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      this.authService.register(user).subscribe(
        response => {
          console.log('Registration successful:', response);
          alert('El registro se ha creado satisfactoriamente. ¡A continuación!, inicie sesión');
          this.router.navigate(['/iniciar-sesion']);
        },
        error => {
          console.error('Registration error:', error);
          alert('Error en el registro: ' + error.message);
        }
      );
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }

























}