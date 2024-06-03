import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProductosComponent } from '../productos/productos.component';
import { ProductosDetallesComponent } from '../productos-detalles/productos-detalles.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Producto } from '../productos/producto.model';
import { CarritoService } from '../carrito-service/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [ProductosComponent, 
    ProductosDetallesComponent, 
    CommonModule,
    NgFor,
    NgIf,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {

  @ViewChild('carritoVacio') contenedorCarritoVacio!: ElementRef;
  @ViewChild('carritoProductos') contenedorCarritoProductos!: ElementRef;
  @ViewChild('carritoAcciones') contenedorCarritoAcciones!: ElementRef;
  @ViewChild('carritoComprado') contenedorCarritoComprado!: ElementRef;
  @ViewChild('total') contenedorTotal!: ElementRef;

  productosEnCarrito: Producto[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarProductosCarrito();
  }

  cargarProductosCarrito() {
    // Obtener los productos del carrito del servicio
    this.productosEnCarrito = this.carritoService.obtenerProductosCarrito();
    // Llamar a la función del servicio para cargar los productos en el contenedor correspondiente
    this.carritoService.cargarProductosCarrito(this.productosEnCarrito, this.contenedorCarritoProductos.nativeElement);
    // Actualizar los botones de eliminar y el total
    this.actualizarBotonesEliminar();
    this.actualizarTotal();
  }
  actualizarBotonesEliminar() {
    const botonesEliminar = this.contenedorCarritoProductos.nativeElement.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach((boton: { addEventListener: (arg0: string, arg1: (event: Event) => void) => void; }) => {
      boton.addEventListener("click", (event: Event) => this.eliminarDelCarrito(event)); // Usar arrow function para mantener el contexto
    });
  }

  eliminarDelCarrito(event: Event) {
    const idBoton = Number((event.target as HTMLElement).id);
    const index = this.productosEnCarrito.findIndex(producto => producto.id === idBoton);
    if (index > -1) {
      this.productosEnCarrito.splice(index, 1);
      this.carritoService.eliminarProducto(this.productosEnCarrito[index]); // Actualizar el servicio
      this.cargarProductosCarrito();
    }
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.cargarProductosCarrito();
  }

  actualizarTotal() {
    this.contenedorTotal.nativeElement.innerText = `$${this.carritoService.calcularTotal()}`;
  }

  comprarCarrito() {
    localStorage.setItem("productos-en-carrito", JSON.stringify(this.productosEnCarrito));
    this.contenedorCarritoVacio.nativeElement.classList.add("disabled");
    this.contenedorCarritoProductos.nativeElement.classList.add("disabled");
    this.contenedorCarritoAcciones.nativeElement.classList.add("disabled");
    this.contenedorCarritoComprado.nativeElement.classList.remove("disabled");
    // localStorage.setItem("carrito-estado-comprado", true);
    // this.botonComprar.routerLink="../";
  }
}
