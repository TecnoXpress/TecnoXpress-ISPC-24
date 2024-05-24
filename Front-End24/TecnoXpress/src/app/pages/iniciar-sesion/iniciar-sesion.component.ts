import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-iniciar-sesion',
    standalone: true,
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.css'],
    imports: [CommonModule, ReactiveFormsModule, NgIf]
  })
  export class IniciarSesionComponent {

    loginForm: FormGroup; 
  
    constructor(
      private formBuilder: FormBuilder,  
      private router: Router
    ) {
      this.loginForm = this.formBuilder.group({ 
        usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        contraseña: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
      });
    }
  
    submitForm(): void {
      if (this.loginForm.valid) {
        console.log("Enviando al servidor...");
        //this.authService.login(this.loginForm.value).subscribe(
          //() => {
            console.log("Inicio de sesión exitoso.");
            this.router.navigate(['/dashboard']); 
          }
          (error: any) => {
            console.error("Error al iniciar sesión:", error);
          }
      } //else {
        //this.loginForm.markAllAsTouched();
      }
