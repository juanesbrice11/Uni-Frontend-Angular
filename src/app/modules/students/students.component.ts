import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
})

export class StudentsComponent {
  student = { studentId: '', name: '', birthDate: '' };

  apiUrl = 'http://localhost:3000/students';
  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {}

  saveStudent() {
    const token = this.authService.getToken(); 
    console.log('Token enviado en la petición:', token);

    if (!token) {
        alert('No tienes permisos para realizar esta acción');
        return;
    }

    this.http.post(this.apiUrl, this.student, {
        headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
        next: (response) => {
            console.log('Estudiante guardado:', response);
            alert('Estudiante guardado con éxito');
            this.student = { studentId: '', name: '', birthDate: '' };
        },
        error: (error) => {
            console.error('Error al guardar el estudiante:', error);
            alert('Error al guardar el estudiante');
        }
    });
}

  goToStudents() {
    this.router.navigate(['/students-list']);
  }

}
