import { Component, OnInit, Inject } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth-service/auth.service';
import { Pedido } from '../../checkout/Model/pedido.model';
import { CarritoService } from '../../carrito/carrito-service/carrito.service';
import { ProductosService } from '../../product services/productos.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../auth/registrar/user.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-pendientes-component',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './pendientes-component.component.html',
  styleUrl: './pendientes-component.component.css'
})
export class  PendientesComponent implements OnInit {
  currentUser: User | null = null;
  comprasPendientes: Pedido[] = [];
  pedidos: Pedido[] = [];

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
        this.comprasPendientes = this.pedidos.filter(pedido => pedido.carrito.length > 0);
      });

    }
  }

}


