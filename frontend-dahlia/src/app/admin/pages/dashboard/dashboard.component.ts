import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  userEmail: string | null = null;
  isDropdownOpen = false;
  isDarkMode = false;

  ngOnInit(): void {
    if (!this.authService.checkAuthStatus()) {
      this.router.navigate(['/login']);
      return;
    }
    this.userEmail = this.authService.getUserEmail();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleMenu(): void {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  logout(): void {
    console.log('Tentative de déconnexion...');
    
    const token = this.authService.getToken();
    if (!token) {
      this.authService.logout();
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:3000/auth/logout', {}, {
      headers: headers,
      responseType: 'json'
    }).subscribe({
      next: () => {
        this.authService.logout();
      },
      error: (error: any) => {
        console.error('Erreur lors de la déconnexion:', error);
        this.authService.logout();
      }
    });
  }
}
