import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { inject } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './admin-navigation.component.html',
  styleUrls: ['./admin-navigation.component.css']
})
export class AdminNavigationComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private http = inject(HttpClient);

  isDropdownOpen = false;
  isMobileMenuOpen = false;

  constructor() {
    // S'abonner aux événements de navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Fermer le menu mobile et les dropdowns après la navigation
      this.closeAllMenus();
    });
  }

  get userEmail(): string | null {
    return this.authService.getUserEmail();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeAllMenus(): void {
    this.isDropdownOpen = false;
    this.isMobileMenuOpen = false;
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
