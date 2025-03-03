import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-enrollments',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './enrollments.component.html',
})
export class EnrollmentsComponent implements OnInit {
    apiUrl = 'http://localhost:3000/enrollments'; 
    studentsUrl = 'http://localhost:3000/students'; 
    coursesUrl = 'http://localhost:3000/courses'; 

    enrollment = { studentId: '', courseId: '', enrollmentDate: '' };
    students: any[] = []; 
    courses: any[] = []; 

    constructor(private router: Router, private authService: AuthService, private http: HttpClient) {}

    ngOnInit() {
        this.loadStudents();
        this.loadCourses();
    }

    loadStudents() {
        this.http.get<any[]>(this.studentsUrl).subscribe({
            next: (data) => {
                this.students = data;
            },
            error: (error) => {
                console.error('Error al cargar estudiantes:', error);
            }
        });
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

    saveEnrollment() {
        const token = this.authService.getToken();
        console.log('Token enviado en la petición:', token);
    
        if (!token) {
            alert('No tienes permisos para realizar esta acción');
            return;
        }
    
        this.http.post(this.apiUrl, this.enrollment, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
            next: (response) => {
                console.log('Inscripción guardada:', response);
                alert('Inscripción guardada con éxito');
                this.enrollment = { studentId: '', courseId: '', enrollmentDate: '' };
            },
            error: (error) => {
                console.error('Error al guardar:', error);
                alert('Error al guardar la inscripción');
            }
        });
    }
    

    goToEnrollments() {
        this.router.navigate(['/enrollments-list']);
      }
}
