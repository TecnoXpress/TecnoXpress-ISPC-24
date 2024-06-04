import { Component, OnInit } from '@angular/core';
import {  RouterModule } from '@angular/router';

interface PurchaseDetails {
  user: string;
  purchaseDate: string;
  productName: string;
  quantity: number;
  shippingStatus: string;
}

@Component({
  selector: 'app-pendientes-component',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './pendientes-component.component.html',
  styleUrl: './pendientes-component.component.css'
})
export class  PendientesComponent implements OnInit {
  purchaseDetails: PurchaseDetails = {
    user: 'Juan Pérez',
    purchaseDate: '2024-06-01',
    productName: 'Laptop',
    quantity: 1,
    shippingStatus: 'En camino'
  };

  constructor() { }

  ngOnInit(): void {
  }
}


