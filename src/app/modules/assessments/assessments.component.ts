import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assessments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessments.component.html',
})
export class AssessmentsComponent implements OnInit {
    apiUrl = 'http://localhost:3000/assessments'; 
    coursesUrl = 'http://localhost:3000/courses'; 

    assessment = { courseId: '', name: '', date: '' };
    courses: any[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadCourses();
    }

    loadCourses() {
        this.http.get<any[]>(this.coursesUrl).subscribe({
            next: (data) => {
                this.courses = data;
            },
            error: (error) => {
                console.error('Error al cargar cursos:', error);
            }
        });
    }

    saveAssessment() {
        console.log('Evaluación guardada:', this.assessment);

        this.http.post(this.apiUrl, this.assessment).subscribe({
            next: (response) => {
                console.log('Evaluación guardada:', response);
                alert('Evaluación guardada con éxito');
                this.assessment = { courseId: '', name: '', date: '' };
            },
            error: (error) => {
                console.error('Error al guardar la evaluación:', error);
                alert('Error al guardar la evaluación');
            }
        });
    }
}
