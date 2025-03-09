import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    
    if (!token || !this.authService.isAuthenticated()) {
      console.log('AuthGuard - Usuario NO autenticado, redirigiendo a login.');
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getUserRole();
    const allowedRoles = route.data['roles'] as string[]; 

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      console.log(`AuthGuard - Acceso denegado para el rol: ${userRole}`);
      this.router.navigate(['/']);
      return false;
    }

    console.log('AuthGuard - Acceso permitido');
    return true;
  }
}
