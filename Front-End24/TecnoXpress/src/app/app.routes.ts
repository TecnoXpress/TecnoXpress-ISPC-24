import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { SomosComponent } from './pages/somos/somos.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegistroComponent } from './pages/registrar/registrar.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciar-sesion.component';


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
  component: RegistroComponent
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
  }

];
