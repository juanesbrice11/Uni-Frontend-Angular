import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
})
export class CoursesComponent implements OnInit {

  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/courses'; 
  prerequisitesUrl = 'http://localhost:3000/courses';
  
  professorsUrl = 'http://localhost:3000/professors'; 
  professor = { name: '', hireDate: '', departmentId: '' };
  professors: any[] = []; 

  course = { name: '', description: '', professorId: '', prerequisiteIds: [] as number[]};
  prerequisites: any[] = []; 

  ngOnInit() {
    this.loadPrerequisites();
    this.loadProfessors();
  }

  loadProfessors() {
    this.http.get<any[]>(this.professorsUrl).subscribe({
      next: (data) => {
        this.professors = data;
      },
      error: (error) => {
        console.error('Error al cargar profesores:', error);
      }
    });
  }


  loadPrerequisites() {
    this.http.get<any[]>(this.prerequisitesUrl).subscribe({
      next: (data) => {
        this.prerequisites = data;
      },
      error: (error) => {
        console.error('Error al cargar los cursos:', error);
      }
    });
  }

  togglePrerequisite(id: number) {
    const index = this.course.prerequisiteIds.indexOf(id);
    if (index === -1) {
      this.course.prerequisiteIds.push(id);
    } else {
      this.course.prerequisiteIds.splice(index, 1);
    }
  }

  saveCourse() {
    console.log('Curso guardado:', this.course);

    this.http.post(this.apiUrl, this.course).subscribe({
      next: (response) => {
        console.log('Curso guardado:', response);
        alert('Curso guardado con éxito');
        this.course = { name: '', description: '', professorId: '', prerequisiteIds: [] };
      },
      error: (error) => {
        console.error('Error al guardar el curso:', error);
        alert('Error al guardar el curso');
      }
    });
  }
}
