import { Component, OnInit, Inject } from '@angular/core';
import { CarritoService } from '../carrito/carrito-service/carrito.service';
import { Producto } from '../productos/producto.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { CheckoutService } from './checkout-service/checkout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carrito: { producto: Producto, cantidad: number }[] = [];
  totalPrecio: number = 0;
  checkoutForm!: FormGroup;

  constructor(
    private carritoService: CarritoService,
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    @Inject(ToastrService) private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.carritoService.obtenerCarrito().subscribe(productos => {
      this.carrito = productos;
      this.calcularTotal();
    });

    this.checkoutForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      tarjeta: ['', [Validators.required, Validators.pattern('\\d{16}')]],
      exp: ['', [Validators.required, Validators.pattern('\\d{2}/\\d{2}')]],
      cvv: ['', [Validators.required, Validators.pattern('\\d{3}')]]
    });
  }

  calcularTotal(): void {
    this.totalPrecio = this.carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  onSubmit(): void {
    if (this.checkoutForm.valid) {
      const datosPago = {
        ...this.checkoutForm.value,
        carrito: this.carrito,
        total: this.totalPrecio,
        fechaPago: new Date().toISOString() // Agregar la fecha de pago
      };
      
      this.checkoutService.procesarPago(datosPago).subscribe({
        next: () => {
          this.toastr.success('Compra realizada con éxito');
          this.carritoService.vaciarCarrito();
        },
        error: (error) => {
          console.error('Error al procesar el pago:', error);
          this.toastr.error('Error al procesar el pago. Intente nuevamente.');
        }
      });
    } else {
      this.toastr.warning('Por favor, complete el formulario correctamente.');
    }
  }
}







