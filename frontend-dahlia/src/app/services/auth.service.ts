import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {
    // Vérifier l'état d'authentification au démarrage
    this.checkAuthStatus();
  }

  checkAuthStatus(): boolean {
    const token = this.cookieService.get('access_token');
    const isAuthenticated = !!token;
    this.isAuthenticatedSubject.next(isAuthenticated);
    return isAuthenticated;
  }

  getToken(): string | null {
    return this.cookieService.get('access_token') || null;
  }

  getUserEmail(): string | null {
    return this.cookieService.get('user_email') || null;
  }

  logout(): void {
    this.cookieService.delete('access_token');
    this.cookieService.delete('user_email');
    this.cookieService.delete('user_id');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
}
