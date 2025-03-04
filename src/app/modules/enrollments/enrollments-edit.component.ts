import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-enrollment',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './enrollments-edit.component.html'
})
export class EditEnrollmentComponent implements OnInit {
    apiUrl = 'http://localhost:3000/enrollments';
    enrollment = { studentId: '', courseId: '', enrollmentDate: '' };
    students: any[] = [];
    courses: any[] = [];
    enrollmentId: string | null = null;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.enrollmentId = this.route.snapshot.paramMap.get('id');
        if (this.enrollmentId) {
            this.loadEnrollment();
        }
        this.loadStudents();
        this.loadCourses();
    }

    getHeaders() {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadEnrollment() {
        this.http.get<any>(`${this.apiUrl}/${this.enrollmentId}`, this.getHeaders()).subscribe({
            next: (data) => {
                this.enrollment = {
                    studentId: data.student.id, 
                    courseId: data.course.id,    
                    enrollmentDate: data.enrollmentDate
                };
            },
            error: (error) => {
                console.error('Error al cargar la matrícula:', error);
            }
        });
    }

    loadStudents() {
        this.http.get<any[]>('http://localhost:3000/students', this.getHeaders()).subscribe({
            next: (data) => {
                this.students = data;
            },
            error: (error) => {
                console.error('Error al cargar los estudiantes:', error);
            }
        });
    }

    loadCourses() {
        this.http.get<any[]>('http://localhost:3000/courses', this.getHeaders()).subscribe({
            next: (data) => {
                this.courses = data;
            },
            error: (error) => {
                console.error('Error al cargar los cursos:', error);
            }
        });
    }

    updateEnrollment() {
        if (!this.enrollmentId) {
            alert('Error: No se encontró la matrícula a actualizar.');
            return;
        }
    
        const updatedEnrollment = {
            studentId: this.enrollment.studentId,
            courseId: this.enrollment.courseId,
            enrollmentDate: this.enrollment.enrollmentDate
        };
    
        this.http.patch(`${this.apiUrl}/${this.enrollmentId}`, updatedEnrollment, this.getHeaders()).subscribe({
            next: () => {
                alert('Matrícula actualizada con éxito');
                this.router.navigate(['/enrollments']);
            },
            error: (error) => {
                console.error('Error al actualizar la matrícula:', error);
                alert('Error al actualizar la matrícula');
            }
        });
    }
    

    cancelEdit() {
        this.router.navigate(['/enrollments']);
    }
}
