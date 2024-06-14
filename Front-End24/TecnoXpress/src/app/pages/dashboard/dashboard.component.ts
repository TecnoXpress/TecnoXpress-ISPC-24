import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../../tab/tab.component';
import { TabContentComponent } from '../../tab-content/tab-content.component';
import { PendientesComponent } from './pendientes-component/pendientes-component.component';
import { RealizadasComponent } from './realizadas-component/realizadas-component.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, 
            CommonModule, 
            TabComponent, 
            TabContentComponent, 
            PendientesComponent,
            RealizadasComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
