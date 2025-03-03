import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  private http = inject(HttpClient);
  private router = inject(Router);
  private authService = inject(AuthService); 

  onLogin() {
    const body = { email: this.email, password: this.password };
  
    this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', body)
      .subscribe({
        next: (response) => {
          console.log('Login - Respuesta completa del backend:', response);
  
          if (response && response.access_token) { 
            console.log('Login - Token recibido:', response.access_token);
            this.authService.setToken(response.access_token); 
            this.router.navigate(['/students']); 
          } else {
            console.error('Login - No se recibió un token válido.');
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Error en las credenciales');
        }
      });
  }
  
  
}
