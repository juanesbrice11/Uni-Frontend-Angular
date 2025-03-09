import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  setToken(token: string): void {
    console.log('AuthService - Guardando token:', token);
    localStorage.setItem('token', token);
  }

getToken(): string | null {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}


  removeToken(): void {
    console.log('AuthService - Eliminando token');
    localStorage.removeItem('token');
  }

  getUserRole(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken?.role || '';
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return '';
      }
    }
    return '';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }
}
