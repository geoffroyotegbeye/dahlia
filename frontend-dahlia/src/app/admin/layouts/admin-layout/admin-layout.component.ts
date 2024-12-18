import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminNavigationComponent } from '../../components/admin-navigation/admin-navigation.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminNavigationComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-admin-navigation></app-admin-navigation>
      <main class="py-6 px-4 sm:px-6 lg:px-8">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AdminLayoutComponent {}
