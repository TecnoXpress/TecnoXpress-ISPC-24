import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SomosComponent } from './pages/somos/somos.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegistrarComponent } from './pages/auth/registrar/registrar.component';
import { IniciarSesionComponent } from './pages/auth/iniciar-sesion/iniciar-sesion.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { AuthGuard } from './pages/guards/auth.guard';
import { ProductosDetallesComponent } from './pages/productos-detalles/productos-detalles.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'somos', component: SomosComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'registrar', component: RegistrarComponent },
  { path: 'iniciar-sesion', component: IniciarSesionComponent },
  { path: 'productos', component: ProductosComponent },
  {path:'detalles/:id', component:ProductosDetallesComponent},

  { path: 'carrito', component: CarritoComponent },

];
