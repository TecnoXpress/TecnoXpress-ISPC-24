import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService } from '../carrito-service/carrito.service'; // Asegúrate de importar tu servicio de carrito
import { Router } from '@angular/router';
import { Producto } from '../productos/producto.model';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  pedidoEnviado: boolean = false;
  productosCarrito: Producto[] = []; // Array para almacenar los productos del carrito
  totalCarrito: number = 0; // Variable para almacenar el total del carrito

  constructor(
    private formBuilder: FormBuilder,
    private carritoService: CarritoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Inicializar el formulario con validaciones
    this.checkoutForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      direccionFactura: ['', Validators.required],
      direccion2: [''], // Opcional
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      cp: ['', Validators.required],
      mismaDireccion: [false], // Checkbox
      guardarInfo: [false], // Checkbox
      metododepago: ['', Validators.required],
      tcname: ['', Validators.required],
      nroTarjeta: ['', Validators.required],
      vto: ['', Validators.required],
      codSeg: ['', Validators.required]
    });

    // Obtener los productos del carrito y calcular el total al iniciar el componente
    this.productosCarrito = this.carritoService.obtenerProductosCarrito();
    this.calcularTotal();
  }

  // Getters para acceder a los controles del formulario en la plantilla
  get nombre() { return this.checkoutForm.get('nombre'); }
  get apellido() { return this.checkoutForm.get('apellido'); }
  get username() { return this.checkoutForm.get('username'); }
  get email() { return this.checkoutForm.get('email'); }
  get direccionFactura() { return this.checkoutForm.get('direccionFactura'); }
  get direccion2() { return this.checkoutForm.get('direccion2'); }
  get ciudad() { return this.checkoutForm.get('ciudad'); }
  get pais() { return this.checkoutForm.get('pais'); }
  get cp() { return this.checkoutForm.get('cp'); }
  get mismaDireccion() { return this.checkoutForm.get('mismaDireccion'); }
  get guardarInfo() { return this.checkoutForm.get('guardarInfo'); }
  get metododepago() { return this.checkoutForm.get('metododepago'); }
  get tcname() { return this.checkoutForm.get('tcname'); }
  get nroTarjeta() { return this.checkoutForm.get('nroTarjeta'); }
  get vto() { return this.checkoutForm.get('vto'); }
  get codSeg() { return this.checkoutForm.get('codSeg'); }

  onSubmit() {
    if (this.checkoutForm.valid) {
      // Lógica para enviar el pedido
      const datosPedido = {
        ...this.checkoutForm.value,
        productos: this.productosCarrito,
        total: this.totalCarrito
      };

      // Aquí enviarías los datos del pedido a tu backend para procesarlo
      // ... (implementa la lógica de envío según tus necesidades)

      this.pedidoEnviado = true; // Mostrar mensaje de éxito
      this.carritoService.vaciarCarrito(); // Vaciar el carrito después de la compra
      this.router.navigate(['/']); // Redirigir a la página principal (opcional)
    } else {
      this.checkoutForm.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar los mensajes de error
    }
  }

  calcularTotal() {
    this.totalCarrito = this.carritoService.calcularTotal();
  }
}