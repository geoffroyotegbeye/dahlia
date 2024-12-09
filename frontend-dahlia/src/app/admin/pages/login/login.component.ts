import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion Admin Dahlia
          </h2>
        </div>
        <form class="mt-8 space-y-6" (ngSubmit)="onSubmit()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email" class="sr-only">Email</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" 
                placeholder="Email"
                [(ngModel)]="email"
              >
            </div>
            <div>
              <label for="password" class="sr-only">Mot de passe</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm" 
                placeholder="Mot de passe"
                [(ngModel)]="password"
              >
            </div>
          </div>

          <div>
            <button 
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Se Connecter
            </button>
          </div>

          <div *ngIf="errorMessage" class="text-red-500 text-center">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  `
})
export class AdminLoginComponent {
  email: string = 'admin@dahlia.org';
  password: string = 'admin123';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    console.log('AdminLoginComponent initialized');
  }

  onSubmit() {
    console.log('Login attempt:', this.email);
    this.authService.login(this.email, this.password)
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err) => {
          console.error('Login error', err);
          this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        }
      });
  }
}
