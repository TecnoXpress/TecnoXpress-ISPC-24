import { Component, OnInit, inject } from '@angular/core';
import { Producto } from './producto.model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../product services/productos.service';
import { CarritoService } from '../carrito/carrito-service/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    RouterModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  productosService = inject(ProductosService);
  listaProductos: Producto[] = [];
  totalProductos: number = 0;
  toastr = inject(ToastrService);

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.getProductos();
    this.carritoService.obtenerTotalProductos().subscribe({
      next: (total) => {
        this.totalProductos = total;
      },
      error: (error) => {
        this.toastr.error(`ERROR DE LA API: ${error.message}`);
      },
    });
  }

  getProductos() {
    this.productosService.getProductos().subscribe({
      next: (res: Producto[]) => {
        this.listaProductos = res;
      },
      error: (error) => {
        this.toastr.error(`ERROR DE LA API: ${error.message}`);
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
          this.toastr.error(`ERROR DE LA API: ${error.message}`);
        },
      });
    }
  }

  agregarAlCarrito(producto: Producto) {
    const result = this.carritoService.agregarProductoAlCarrito(producto);
    if (result.success) {
    //  this.toastr.success(result.message);
    } else {
    //  this.toastr.error(result.message);
    }
  }
}




