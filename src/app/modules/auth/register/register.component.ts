import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-6 rounded shadow-md w-80">
        <h2 class="text-2xl font-bold mb-4">Registro</h2>
        
        <form (ngSubmit)="onRegister()">
          <input type="text" [(ngModel)]="name" name="name" placeholder="Nombre" class="w-full p-2 border rounded mb-2" required>
          <input type="email" [(ngModel)]="email" name="email" placeholder="Correo" class="w-full p-2 border rounded mb-2" required>
          <input type="password" [(ngModel)]="password" name="password" placeholder="Contraseña" class="w-full p-2 border rounded mb-2" required>
          <button type="submit" class="w-full bg-green-500 text-white p-2 rounded">Registrarse</button>
        </form>

        <p class="mt-4 text-sm">
          ¿Ya tienes cuenta? 
          <a routerLink="/login" class="text-blue-600">Inicia sesión</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  onRegister() {
    console.log('Registrando usuario:', this.name, this.email);
    // Aquí puedes agregar lógica para registrar en un backend
    this.router.navigate(['/login']); // Redirigir al login después del registro
  }
}
