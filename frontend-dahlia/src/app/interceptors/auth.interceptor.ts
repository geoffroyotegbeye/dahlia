// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor called'); // Ajoutez ce log pour vérifier
    const token = this.cookieService.get('access_token');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      tap(event => {
        // Gérer les réponses ici si nécessaire
      }, error => {
        if (error.status === 401) {
          // Déconnecter l'utilisateur
          this.cookieService.delete('access_token');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
