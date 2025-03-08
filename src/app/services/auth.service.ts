import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  setToken(token: string): void {
    console.log('AuthService - Guardando token en localStorage:', token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return token;
    }
    return null;
  }

  removeToken(): void {
    console.log('AuthService - Eliminando token de localStorage');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
}
