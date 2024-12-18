import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService, User, CreateUserDto, UpdateUserDto } from '../../../services/users.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
})
export class AdminUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  showModal: boolean = false;
  editingUser: User | null = null;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {
    this.userForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        console.log('Users received:', users); // Ajoutez ce log pour vérifier les données reçues
        this.users = users.map(user => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role
        }));
        this.filterUsers();
      },
      error: (error) => {
        console.error('Erreur:', error);
      }
    });
  }

  filterUsers(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      (user.first_name && user.first_name.toLowerCase().includes(term)) ||
      (user.last_name && user.last_name.toLowerCase().includes(term)) ||
      (user.email && user.email.toLowerCase().includes(term)) ||
      (user.role && user.role.toLowerCase().includes(term))
    );
  }

  openAddUserModal(): void {
    this.editingUser = null;
    this.userForm.reset({ role: 'user' });
    // Rendre le mot de passe obligatoire pour un nouvel utilisateur
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.showModal = true;
  }

  editUser(user: User): void {
    this.editingUser = {
      ...user,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      role: user.role || 'user'
    };

    // Rendre le mot de passe optionnel lors de l'édition
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.setValidators([Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();

    this.userForm.patchValue({
      first_name: this.editingUser.first_name,
      last_name: this.editingUser.last_name,
      email: this.editingUser.email,
      role: this.editingUser.role,
      password: ''
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingUser = null;
    this.userForm.reset();
  }

  submitUser(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      // Supprimer le mot de passe s'il est vide lors de l'édition
      if (this.editingUser && !userData.password) {
        delete userData.password;
      }

      if (this.editingUser) {
        this.usersService.updateUser(this.editingUser.id, userData).subscribe({
          next: (updatedUser) => {
            const index = this.users.findIndex(u => u.id === this.editingUser!.id);
            if (index !== -1) {
              this.users[index] = {
                id: updatedUser.id,
                first_name: updatedUser.first_name,
                last_name: updatedUser.last_name,
                email: updatedUser.email,
                role: updatedUser.role
              };
            }
            this.filterUsers();
            this.closeModal();
          },
          error: (error) => {
            console.error('Erreur:', error);
          }
        });
      } else {
        this.usersService.createUser(userData).subscribe({
          next: (newUser) => {
            this.users.push({
              id: newUser.id,
              first_name: newUser.first_name,
              last_name: newUser.last_name,
              email: newUser.email,
              role: newUser.role
            });
            this.filterUsers();
            this.closeModal();
          },
          error: (error) => {
            console.error('Erreur:', error);
          }
        });
      }
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${user.first_name} ${user.last_name} ?`)) {
      this.usersService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.filterUsers();
        },
        error: (error) => {
          console.error('Erreur:', error);
        }
      });
    }
  }
}
