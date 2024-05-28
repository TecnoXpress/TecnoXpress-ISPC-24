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

  registerForm!: FormGroup; 

  constructor(
    private formBuilder: FormBuilder) 
  {
    this.registerForm = this.formBuilder.group(
     {
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      nombreUsuario: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(20), ]], 
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]], 
      fechaNacimiento: ['', Validators.required], 
      password: ['', [Validators.required, Validators.minLength(11)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator }); 
  }


    
    get Email() {
      return this.registerForm.get("email");
         
    }
    
    get Nombre() {
      return this.registerForm.get("nombre");
         

    }
    get NombreUsuario() {
      return this.registerForm.get("nombreUsuario");
         
    }

    get Apellido() {
      return this.registerForm.get("apellido");
         
    }
    
    get Telefono() {
      return this.registerForm.get("telefono");
         
    }

    get Dni() {
      return this.registerForm.get("dni");
         
    }

    get FechaNacimiento() {
      return this.registerForm.get("fechaNacimiento");
         
    }

    get Password() {
      return this.registerForm.get("password");
         
    }
    get ConfirmPassword() {
      return this.registerForm.get("confirmPassword");
         
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
    onEnviar(event:Event) {
    
      console.log(this.registerForm.value);
      
    
}

  }