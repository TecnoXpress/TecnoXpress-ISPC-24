import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})

export class IniciarSesionComponent implements OnInit {
  loginForm: FormGroup;

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
  } }