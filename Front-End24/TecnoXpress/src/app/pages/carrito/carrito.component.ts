import { Component, OnInit } from '@angular/core';
import { Producto } from '../productos/producto.model';
import { ProductosService } from '../product services/productos.service';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {
    this.productosService.obtenerCarrito().subscribe({
      next: (productos) => {
        this.carrito = productos;
      },
      error: (error) => {
        console.error('Error al obtener el carrito:', error);
      }
    });

    this.productosService.obtenerTotal().subscribe({
      next: (total) => {
        this.total = total;
      },
      error: (error) => {
        console.error('Error al obtener el total:', error);
      }
    });
  }

  removerDelCarrito(producto: Producto) {
    this.productosService.removerProductoDelCarrito(producto);
  }

  vaciarCarrito() {
    this.productosService.vaciarCarrito();
  }
}