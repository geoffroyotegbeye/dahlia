// src/app/services/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'user' | 'editor' | 'admin';
}

export interface CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserDto {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('access_token');
    console.log('Token:', token); // Ajoutez ce log pour vérifier le token
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(this.apiUrl, { headers });
  }

  getUser(id: string): Observable<User> {
    const headers = this.getHeaders();
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }

  createUser(user: CreateUserDto): Observable<User> {
    const headers = this.getHeaders();
    return this.http.post<User>(this.apiUrl, user, { headers });
  }

  updateUser(id: string, user: UpdateUserDto): Observable<User> {
    const headers = this.getHeaders();
    return this.http.patch<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteUser(id: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
