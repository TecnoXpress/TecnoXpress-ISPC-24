import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  imports: [CommonModule, ReactiveFormsModule,NgIf],

})
export class ContactComponent {

  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder)  
{
    this.contactForm = this.formBuilder.group(
      {
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(20)]],
      asunto: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(60)]],
      mensaje: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(300)]],
    }
  );
  
}
get Email() {
  return this.contactForm.get("email");
     
}

get Nombre() {
  return this.contactForm.get("nombre");
     
}

get Telefono() {
  return this.contactForm.get("telefono");
     
}

get Asunto() {
  return this.contactForm.get("asunto");
     
}

get Mensaje() {
  return this.contactForm.get("mensaje");
     
}
  onEnviar(event:Event) {
    
      console.log(this.contactForm.value);
    
}
  
}