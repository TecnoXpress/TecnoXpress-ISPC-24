import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css'],
  imports: [CommonModule, ReactiveFormsModule,NgIf],
})

export class IniciarSesionComponent  {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      contraseña: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    });
  }

  submitForm() {
    if (this.loginForm.valid) {
      console.log("Formulario enviado");
    } else {
      console.log("El formulario no se envió.");
      alert("El formulario no se envió porque hay errores de validación.");
    }
  }
}
