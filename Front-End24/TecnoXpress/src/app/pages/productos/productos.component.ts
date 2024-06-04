import { Component, OnInit, inject } from '@angular/core';
import { Producto } from './producto.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CarritoComponent } from '../carrito/carrito.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../product services/productos.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    RouterModule,
    CarritoComponent,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productosService = inject(ProductosService);

  listaProductos: Producto[] = [];
  carrito: Producto[] = [];

  constructor() { }

  ngOnInit(): void {
    this.getProductos();
    this.productosService.obtenerCarrito().subscribe({
      next: (productos) => {
        this.carrito = productos;
      },
      error: (error) => {
        alert(`ERROR DE LA API: ${error.message}`);
      },
    });
  }

  getProductos() {
    this.productosService.getProductos().subscribe({
      next: (res: Producto[]) => {
        this.listaProductos = res;
      },
      error: (error) => {
        alert(`ERROR DE LA API: ${error.message}`);
      },
    });
  }

  filterProductoPorCategoria(categoryId: string) {
    if (categoryId === 'todos') {
      this.getProductos();
    } else {
      this.productosService.getProductosPorCategorias(categoryId).subscribe({
        next: (res: Producto[]) => {
          this.listaProductos = res;
        },
        error: (error) => {
          alert(`ERROR DE LA API: ${error.message}`);
        },
      });
    }
  }

  agregarAlCarrito(producto: Producto) {
    this.productosService.agregarProductoAlCarrito(producto);
    alert(`${producto.nombre} ha sido agregado al carrito.`);
  }
}