import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})

export class RegistrarComponent implements OnInit {
  nombre: string;
  apellido: string;
  dni: number;
  celular: number;
  fechaNacimiento: Date;
  email: string;
  contraseña: string;
  confirmarContraseña: string;
  registroForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[A-Za-z]+')]],
      apellido: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[A-Za-z]+')]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]{8}')]],
      celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmarContraseña: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.registroForm.valid) {
      console.log("Formulario enviado exitosamente");
    } else {
      console.log("El formulario no se envió porque hay errores de validación.");
      alert("El formulario no se envió porque hay errores de validación.");
    }
  }
}
