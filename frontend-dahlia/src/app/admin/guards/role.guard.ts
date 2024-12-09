import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.authService.getUserRole();
    const requiredRoles = route.data['roles'] as UserRole[];

    if (!userRole) {
      this.router.navigate(['/admin/login']);
      return false;
    }

    // Super Admin can access everything
    if (userRole === UserRole.SUPER_ADMIN) {
      return true;
    }

    // Check if user's role is in the required roles
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }

    return true;
  }
}
