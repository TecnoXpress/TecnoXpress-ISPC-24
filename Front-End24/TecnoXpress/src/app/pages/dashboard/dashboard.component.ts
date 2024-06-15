import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth-service/auth.service';
import { Pedido } from '../checkout/Model/pedido.model';
import { User } from '../auth/registrar/user.model';
import { CarritoService } from '../carrito/carrito-service/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { Producto } from '../productos/producto.model';
import { ProductosService } from '../product services/productos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  pedidos: Pedido[] = [];
  comprasRealizadas: Pedido[] = [];
  comprasPendientes: Pedido[] = [];
  productosRecomendados: Producto[] = [];

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private productosService: ProductosService,
    @Inject(ToastrService) private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser && this.currentUser.id) {
      this.authService.getPedidos(this.currentUser.id).subscribe(pedidos => {
        this.pedidos = pedidos;
        this.comprasRealizadas = this.pedidos.filter(pedido => pedido.estado === 'completado');
        this.comprasPendientes = this.pedidos.filter(pedido => pedido.estado !== 'completado');
      });

      this.productosService.getProductos().subscribe(productos => {
        this.productosRecomendados = productos.slice(0, 3);
      });
    }
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
    this.toastr.success('Carrito vaciado correctamente');
    this.actualizarDatos();
  }

  actualizarDatos(): void {
    if (this.currentUser && this.currentUser.id) {
      this.authService.getPedidos(this.currentUser.id).subscribe(pedidos => {
        this.pedidos = pedidos;
        this.comprasRealizadas = this.pedidos.filter(pedido => pedido.estado === 'completado');
        this.comprasPendientes = this.pedidos.filter(pedido => pedido.estado !== 'completado');
      });
    }
  }

  agregarAlCarrito(producto: Producto): void {
    const result = this.carritoService.agregarProductoAlCarrito(producto);
    if (result.success) {
      this.toastr.success(result.message);
    } else {
      this.toastr.error(result.message);
    }
  }
}

