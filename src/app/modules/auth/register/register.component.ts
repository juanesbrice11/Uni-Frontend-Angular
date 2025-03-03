import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  user = { email: '', password: '' };
  
  apiUrl = 'http://localhost:3000/users/register';
  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {
    this.http.post(this.apiUrl, this.user).subscribe({
      next: (response) => {
        console.log('Usuario guardado:', response);
        alert('Usuario guardado con éxito');
        this.user = { email: '', password: ''}; 
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar el usuario');
      }
    });
    this.router.navigate(['/login']); 
  }
}
