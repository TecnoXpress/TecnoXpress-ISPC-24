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
    this.productosEnCarrito = this.carritoService.obtenerProductosCarrito();

    if (this.productosEnCarrito.length > 0) {
      this.contenedorCarritoVacio.nativeElement.classList.add("disabled");
      this.contenedorCarritoProductos.nativeElement.classList.remove("disabled");
      this.contenedorCarritoAcciones.nativeElement.classList.remove("disabled");
      this.contenedorCarritoComprado.nativeElement.classList.add("disabled");

      this.contenedorCarritoProductos.nativeElement.innerHTML = "";

      this.productosEnCarrito.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("carrito-producto");
        div.innerHTML = `
                   <img  class="carrito-producto-imagen img-fluid" src="${producto.imagen}" alt="${producto.titulo}">

                   <div class="carrito-producto-titulo">
                       <small>Título</small>
                       <h3>${producto.nombre}</h3>
                   </div>
                  
                       <div class="carrito-producto-cantidad">
                           <small>Cantidad</small>
                           <p>${producto.cantidad}</p>
                       </div>
                       <div class="carrito-producto-precio">
                           <small>Precio</small>
                            <p>${producto.precio}</p>
                       </div>
                   <div class="carrito-producto-subtotal">
                       <small>Subtotal</small>
                       <p>${producto.precio * producto.cantidad}</p>
                   </div>
                   <button  class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
               `;
        this.contenedorCarritoProductos.nativeElement.append(div);
      });

      this.actualizarBotonesEliminar(); 
      this.actualizarTotal();
    } else {
      this.contenedorCarritoVacio.nativeElement.classList.remove("disabled");
      this.contenedorCarritoProductos.nativeElement.classList.add("disabled");
      this.contenedorCarritoAcciones.nativeElement.classList.add("disabled");
      this.contenedorCarritoComprado.nativeElement.classList.add("disabled");
    }
  }

  actualizarBotonesEliminar() {
    const botonesEliminar = this.contenedorCarritoProductos.nativeElement.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach((boton: { addEventListener: (arg0: string, arg1: (event: Event) => void) => void; }) => {
      boton.addEventListener("click", (event: Event) => this.eliminarDelCarrito(event)); // Usar arrow function para mantener el contexto
    });
  }

  eliminarDelCarrito(event: Event) {
    const idBoton = (event.target as HTMLElement).innerHTML;
    const index = this.productosEnCarrito.findIndex(producto => producto.id_productos === idBoton);
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
