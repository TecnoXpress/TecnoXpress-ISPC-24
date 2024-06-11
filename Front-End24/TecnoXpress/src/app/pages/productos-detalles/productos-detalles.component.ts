import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { ProductosService } from '../product services/productos.service';
import { Producto } from '../productos/producto.model';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../carrito/carrito-service/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productos-detalles',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule,],
  templateUrl: './productos-detalles.component.html',
  styleUrls: ['./productos-detalles.component.css']
})
export class ProductosDetallesComponent implements OnInit {

  id: any;
  producto: Producto = {} as Producto;
  listaProductos: Producto[] = [];
  totalProductos: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private carritoService: CarritoService,
    @Inject(ToastrService) private toastr: ToastrService
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.getSingleProducto();
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

  getSingleProducto(): void {
    this.productosService.getProductoPorId(this.id)
      .subscribe({
        next: (data) => {
          this.producto = data;
        },
        error: (error) => {
          console.error('Error de la API, fetching product:', error);
          this.toastr.error('Error al obtener el producto. Por favor, intente nuevamente.');
        }
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

  agregarAlCarrito() {
    const result = this.carritoService.agregarProductoAlCarrito(this.producto);
    if (result.success) {
      this.toastr.success(result.message);
    } else {
      this.toastr.error(result.message);
    }
  }
}
















