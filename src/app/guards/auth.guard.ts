import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    console.log('AuthGuard - Token:', token);

    if (token) {
      console.log('AuthGuard - Usuario autenticado, permitiendo acceso.');
      return true;
    } else {
      console.log('AuthGuard - Usuario NO autenticado, redirigiendo a login.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
