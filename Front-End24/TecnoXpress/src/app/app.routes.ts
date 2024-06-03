import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SomosComponent } from './pages/somos/somos.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import {RouterModule} from "@angular/router";
import { ProductosDetallesComponent } from './pages/productos-detalles/productos-detalles.component';
import { CheckoutComponent } from './pages/checkout/checkout.component'; // Asegúrate de importar tu componente




export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {path:'dashboard',
  component: DashboardComponent
  },
  {path:'somos',
  component: SomosComponent
  },
  {path:'contact',
  component: ContactComponent
  },
  {path:'registrar',
  component: RegistrarComponent
  },
  {path:'iniciar-sesion',
  component: IniciarSesionComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
  },
  {path:'detalles/:id', component:ProductosDetallesComponent},
  {path:'checkout', component: CheckoutComponent},

  { path: 'carrito', component: CarritoComponent },
  

];
