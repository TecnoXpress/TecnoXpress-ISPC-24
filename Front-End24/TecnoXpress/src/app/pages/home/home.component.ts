import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf,NgFor, CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  images = [
    { url: 'assets/images.jpg', name: 'Teclado', description: 'Teclado moderno y ergonómico.' },
    { url: 'assets/images.jpg', name: 'Monitor', description: 'Monitor de alta definición.' },
    // más imágenes aquí
  ];

}
