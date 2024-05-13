import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      mensaje: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(500)]],
    }
  );
  
}
get Email() {
  return this.contactForm.get("email");
     
}

get Nombre() {
  return this.contactForm.get("nombre");
     
}
get Mensaje() {
  return this.contactForm.get("mensaje");
     
}
  onEnviar(event:Event) {
    
      console.log(this.contactForm.value);
    
}
  
}