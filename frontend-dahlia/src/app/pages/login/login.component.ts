import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../home/footer/footer.component';
import { NavigationComponent } from '../../home/navigation/navigation.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, FooterComponent, NavigationComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = 'admin@dahlia.com';
  password: string = 'admin123';

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService, 
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit() {
    this.http.post<{ access_token: string, user: { email: string, id: number } }>('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      // Stocker le token JWT dans le cookie
      this.cookieService.set('access_token', response.access_token);
      
      // Stocker les informations de l'utilisateur dans le cookie
      this.cookieService.set('user_email', response.user.email);
      this.cookieService.set('user_id', response.user.id.toString());
      
      // Afficher une notification de succès
      this.notificationService.showSuccess('Connexion réussie !');
      
      // Naviguer vers le tableau de bord
      this.router.navigate(['/admin/dashboard']);
    }, error => {
      this.notificationService.showError('Échec de la connexion. Veuillez réessayer.');
    });
  }
}
