import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  course = { name: '', description: '', professorId: '' };
  apiUrl = 'http://localhost:3000/courses';  

  constructor(private http: HttpClient) {}  

  saveCourse() {
    this.http.post(this.apiUrl, this.course).subscribe({
      next: (response) => {
        console.log('Curso guardado con éxito:', response);
        alert('Curso guardado correctamente');
        this.course = { name: '', description: '', professorId: '' }; 
      },
      error: (error) => {
        console.error('Error al guardar el curso:', error);
        alert('Hubo un error al guardar el curso');
      }
    });
  }
}
