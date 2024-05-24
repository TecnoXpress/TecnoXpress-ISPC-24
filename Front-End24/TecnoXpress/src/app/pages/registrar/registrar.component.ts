import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  standalone: true,
  templateUrl: "registrar.component.html",
  styleUrls: ["registrar.component.css"],
  imports: [CommonModule, ReactiveFormsModule, NgIf],
})
export class RegistroComponent {

  registerForm: FormGroup; 

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required], 
      dni: ['', Validators.required], 
      fechaNacimiento: ['', Validators.required], 
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }); 
  }

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

  onSubmit(): void { 
    if (this.registerForm.valid) {
      console.log("Enviando al servidor...");
      //this.authService.register(this.registerForm.value).subscribe( //
       // () => {
          console.log("Registro exitoso.");
          this.router.navigate(['/iniciar-sesion']); 
        }
        (        error: any) => {
          console.error("Error al registrar:", error);
        }
    } //else {
      //this.registerForm.markAllAsTouched();
    }