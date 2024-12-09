import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User, UserRole } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  login(email: string, password: string): Observable<{ user: User, token: string }> {
    // Simulation de connexion (à remplacer par une vraie authentification)
    console.log('AuthService login method called');

    if (email === 'admin@dahlia.org' && password === 'admin123') {
      const mockUser: User = {
        id: '1',
        email: email,
        firstName: 'Admin',
        lastName: 'Dahlia',
        role: UserRole.SUPER_ADMIN,
        isActive: true,
        createdAt: new Date()
      };

      const mockResponse = {
        user: mockUser,
        token: 'fake-jwt-token-' + Math.random().toString(36).substring(2)
      };

      return of(mockResponse).pipe(
        delay(1000), // Simuler un délai de réponse
        tap(response => {
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(response.user);
        })
      );
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private loadUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): UserRole | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }
}
