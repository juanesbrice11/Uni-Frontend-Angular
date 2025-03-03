import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  onLogin() {
    const body = { email: this.email, password: this.password };

    this.http.post<{ token: string }>('http://localhost:3000/auth/login', body)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); 
          this.router.navigate(['/students']); 
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Error en las credenciales');
        }
      });
  }
}
