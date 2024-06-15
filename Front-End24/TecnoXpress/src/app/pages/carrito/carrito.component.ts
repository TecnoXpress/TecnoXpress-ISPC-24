import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Producto } from '../productos/producto.model';
import { CarritoService } from './carrito-service/carrito.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: { producto: Producto, cantidad: number }[] = [];
  totalProductos: number = 0;
  totalPrecio: number = 0;

  constructor(private carritoService: CarritoService, @Inject(ToastrService) private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe(productos => {
      this.carrito = productos;
      this.actualizarTotales();
    });
  }

  actualizarTotales(): void {
    this.totalProductos = this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
    this.totalPrecio = this.carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  removerDelCarrito(producto: Producto): void {
    this.carritoService.removerProductoDelCarrito(producto);
    this.actualizarTotales();
    this.toastr.info(`${producto.nombre} ha sido removido del carrito.`);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.actualizarTotales();
    this.toastr.info('El carrito ha sido vaciado.');
  }

  comprarCarrito(): void {
    this.toastr.success('Redirigiendo a la página de checkout.');
  }
}




