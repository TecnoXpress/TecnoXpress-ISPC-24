import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../pages/auth/auth-service/auth.service';
import { Router, RouterModule,  } from '@angular/router';
import { User } from '../../pages/auth/registrar/user.model';
import { CommonModule,  } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule,RouterLink,RouterModule],
})
export class HeaderComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}