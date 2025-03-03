import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
})

export class StudentsComponent {
  student = { studentId: '', name: '', birthDate: '' };

  apiUrl = 'http://localhost:3000/students';
  constructor(private http: HttpClient) { }

  saveStudent() {
    console.log('Estudiante creado correctamente', this.student);

    this.http.post(this.apiUrl, this.student).subscribe({
      next: (response) => {
        console.log('Estudiante guardado:', response);
        alert('Estudiante guardado con éxito');
        this.student = { studentId: '', name: '', birthDate: '' };
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar el estudiante');
      }
    });
  }

}
