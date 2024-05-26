
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductosService } from '../product services/productos.service';
import { Producto, } from '../productos/producto.model';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from '../productos/productos.component';



@Component({
  selector: 'app-productos-detalles',
  standalone: true,
  imports: [CommonModule,ProductosComponent,RouterLink,],
  templateUrl: './productos-detalles.component.html',
  styleUrl: './productos-detalles.component.css'
})
export class ProductosDetallesComponent implements OnInit {

  id_productos: any;
  producto: Producto = {} as Producto;
  constructor(private route: ActivatedRoute, private productosService: ProductosService) { 
    this.id_productos = this.route.snapshot.paramMap.get('id_productos');
  }
  

  ngOnInit():void {
    this.getSingleProducto();
    
  }

  getSingleProducto(): void {
    this.productosService.getProductoPorId(this.id_productos)
      .subscribe({
        next: (data) => {
          this.producto = data;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
        }
      });
  }



















}
  

















