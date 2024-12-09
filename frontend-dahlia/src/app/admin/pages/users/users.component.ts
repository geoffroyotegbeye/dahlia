import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserRole } from '../../models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-2xl font-bold mb-6">Gestion des Utilisateurs</h1>
      
      <table class="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Nom</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Rôle</th>
            <th class="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users" class="border-b">
            <td class="p-3">{{ user.firstName }} {{ user.lastName }}</td>
            <td class="p-3">{{ user.email }}</td>
            <td class="p-3">{{ user.role }}</td>
            <td class="p-3">
              <button class="text-orange-600 hover:text-orange-800 mr-2">Éditer</button>
              <button class="text-red-600 hover:text-red-800">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [
    {
      id: '1',
      email: 'admin@dahlia.org',
      firstName: 'Admin',
      lastName: 'Principal',
      role: UserRole.SUPER_ADMIN,
      isActive: true,
      createdAt: new Date()
    }
    // Ajoutez plus d'utilisateurs fictifs ou récupérez-les depuis un service
  ];

  constructor() {}

  ngOnInit(): void {}
}
