import { ProductosDetallesComponent } from './../productos-detalles/productos-detalles.component';
import { Component, NgModule, OnInit, inject } from '@angular/core';
import { Producto,Categoria } from './producto.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CarritoComponent } from '../carrito/carrito.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../product services/productos.service';
import { Observable } from 'rxjs';
import { CarritoService } from '../carrito-service/carrito.service'; // Ajusta la ruta si es necesario


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    CommonModule,
    RouterModule,
    CarritoComponent, 
    ProductosDetallesComponent,
    HttpClientModule,
    RouterLink,
    
  ],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
})
export class ProductosComponent implements OnInit {
  productosService = inject(ProductosService);

  listaProductos: Producto[] = [];

  constructor(private carritoService: CarritoService) { }

  ngOnInit(): void {
    this.getProductos();

  }

  getProductos() {
    this.productosService.getProductos().subscribe({
      next: (res: Producto[]) => {
        this.listaProductos = res;
      },
      error: (error) => {
        alert(`ERROR FROM API: ${error.message}`);
      },
    });
  }


  filterProductoPorCategoria(categoryId: string) {
    if (categoryId === 'todos') {
      this.getProductos();
    } else {
      this.productosService.getProductosPorCategorias(categoryId).subscribe({
        next: (res: Producto[]) => {
          this.listaProductos=res;
        },
        error: (error) => {
          alert(`ERROR FROM API: ${error.message}`);
        },
      });
    }
  } 




}
