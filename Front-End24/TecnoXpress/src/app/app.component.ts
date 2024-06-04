import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PendientesComponent } from './pages/dashboard/pendientes-component/pendientes-component.component';
import { RealizadasComponent } from './pages/dashboard/realizadas-component/realizadas-component.component';
import { TabComponent } from './tab/tab.component';
import { TabContentComponent } from './tab-content/tab-content.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            RouterModule,
            HomeComponent,
            HeaderComponent,
            FooterComponent,
            DashboardComponent,
            PendientesComponent,
            RealizadasComponent,
            TabComponent,
            TabContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TecnoXpress';
}