import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-assessments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades.component.html',
})

export class GradesComponent {
  
      apiUrl = 'http://localhost:3000/grades'; 
      studentUrl = 'http://localhost:3000/students';
      assessmentUrl = 'http://localhost:3000/assessments';

      students: any[] = [];
      assessments: any[] = [];
       
      grade = { studentId: '', assessmentId: '', score: '' };
  
      constructor(private http: HttpClient) {}

      ngOnInit() {
          this.loadAssessments();
          this.loadStudents();
      }
      
      loadStudents() {
          this.http.get<any[]>(this.studentUrl).subscribe({
              next: (data) => {
                  this.students = data;
              },
              error: (error) => {
                  console.error('Error al cargar estudiantes:', error);
              }
          });
      }
  
      loadAssessments() {
          this.http.get<any[]>(this.assessmentUrl).subscribe({
              next: (data) => {
                  this.assessments = data;
              },
              error: (error) => {
                  console.error('Error al cargar evaluaciones:', error);
              }
          });
      }
      saveGrade() {
          console.log('Nota guardada:', this.grade);
          this.http.post(this.apiUrl, this.grade).subscribe({
              next: (response) => {
                  console.log('Nota guardada:', response);
                  alert('Nota guardada con éxito');
                  this.grade = { studentId: '', assessmentId: '', score: '' };
              },
              error: (error) => {
                  console.error('Error al guardar la nota:', error);
                  alert('Error al guardar la nota');
              }
          });
      }
  
}
