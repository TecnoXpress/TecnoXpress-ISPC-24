import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            RouterModule,
            HomeComponent,
            HeaderComponent,
            FooterComponent,
            DashboardComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TecnoXpress';
}