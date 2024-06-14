import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth-service/auth.service';
import { Pedido } from '../../checkout/Model/pedido.model';
import { CarritoService } from '../../carrito/carrito-service/carrito.service';
import { ProductosService } from '../../product services/productos.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../auth/registrar/user.model';

@Component({
  selector: 'app-realizadas-component',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './realizadas-component.component.html',
  styleUrl: './realizadas-component.component.css'
})
export class RealizadasComponent{

  currentUser: User | null = null;
  pedidos: Pedido[] = [];
  comprasRealizadas: Pedido[] = [];

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
        this.comprasRealizadas = this.pedidos.filter(pedido => pedido.carrito.length === 0);
      });

    }
  }

}