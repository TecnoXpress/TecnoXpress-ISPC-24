
import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, RouterLink,RouterModule} from '@angular/router';
import { ProductosService } from '../product services/productos.service';
import { Producto, } from '../productos/producto.model';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from '../productos/productos.component';



@Component({
  selector: 'app-productos-detalles',
  standalone: true,
  imports: [CommonModule,ProductosComponent,RouterLink, RouterModule],
  templateUrl: './productos-detalles.component.html',
  styleUrl: './productos-detalles.component.css'
})
export class ProductosDetallesComponent implements OnInit {

  id: any;
  producto: Producto = {} as Producto;
  listaProductos: Producto[] = []; // Copiado desde el componente productos.componente.ts para erutilzar el codigo de filtro por categoria 
  constructor(private route: ActivatedRoute, private productosService: ProductosService) { 
    this.id = this.route.snapshot.paramMap.get('id');
  }
  

  ngOnInit():void {
    this.getSingleProducto();
    this.getProductos();
    
  }

  getSingleProducto(): void {
    this.productosService.getProductoPorId(this.id)
      .subscribe({
        next: (data) => {
          this.producto = data;
        },
        error: (error) => {
          console.error('Error de la API, fetching product:', error);
        }
      });
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
getProductos() {
  this.productosService.getProductos().subscribe({
    next: (res: Producto[]) => {
      this.listaProductos = res;
    },
    error: (error) => {
      alert(`ERROR DE LA  API: ${error.message}`);
    },
  });
}
  // Función copiada desde productos.componente.ts Reutilizacion de la funcion 
  filterProductoPorCategoria(categoryId: string) {
    if (categoryId === 'todos') {
      this.productosService.getProductos().subscribe({
        next: (res: Producto[]) => {
          this.listaProductos = res;
        },
        error: (error) => {
          alert(`ERROR DE LA  API: ${error.message}`);
        },
      });
    } else {
      this.productosService.getProductosPorCategorias(categoryId).subscribe({
        next: (res: Producto[]) => {
          this.listaProductos=res;
        },
        error: (error) => {
          alert(`ERROR DE LA  API: ${error.message}`);
        },
      });
    }
  }




 














}
  

















