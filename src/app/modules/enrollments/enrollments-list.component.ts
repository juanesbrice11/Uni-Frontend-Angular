import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-enrollments-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './enrollments-list.component.html'
})
export class EnrollmentsListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/enrollments';
    studentsUrl = 'http://localhost:3000/students';
    coursesUrl = 'http://localhost:3000/courses';

    enrollments: any[] = [];
    students: any[] = [];
    courses: any[] = [];
    selectedEnrollment: any = null;

    constructor(
        private http: HttpClient, 
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loadEnrollments();
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

    loadEnrollments() {
        this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.enrollments = data;
            },
            error: (error) => {
                console.error('Error al cargar inscripciones:', error);
            }
        });
    }

    loadStudents() {
        this.http.get<any[]>(this.studentsUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.students = data;
                console.log('Estudiantes cargados:', this.students);
            },
            error: (error) => {
                console.error('Error al cargar estudiantes:', error);
            }
        });
    }

    loadCourses() {
        this.http.get<any[]>(this.coursesUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.courses = data;
                console.log('Cursos cargados:', this.courses);
            },
            error: (error) => {
                console.error('Error al cargar cursos:', error);
            }
        });
    }

    getStudentName(studentId: any): string {
        const student = this.students.find(s => String(s.studentId) === String(studentId));
        return student ? student.name : 'Desconocido';
    }
    
    getCourseName(courseId: any): string {
        const course = this.courses.find(c => String(c.id) === String(courseId));
        return course ? course.name : 'Desconocido';
    }
    

    deleteEnrollment(id: number) {
        if (confirm('¿Estás seguro de eliminar esta inscripción?')) {
            this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders()).subscribe({
                next: () => {
                    alert('Inscripción eliminada correctamente');
                    this.loadEnrollments();
                },
                error: (error) => {
                    console.error('Error al eliminar la inscripción:', error);
                    alert('Error al eliminar la inscripción');
                }
            });
        }
    }

    editEnrollment(enrollment: any) {
        this.selectedEnrollment = { ...enrollment };
    }

    updateEnrollment(updatedEnrollment: any) {
        this.http.put(`${this.apiUrl}/${updatedEnrollment.id}`, updatedEnrollment, this.getHeaders()).subscribe({
            next: () => {
                alert('Inscripción actualizada con éxito');
                this.loadEnrollments();
                this.selectedEnrollment = null;
            },
            error: (error) => {
                console.error('Error al actualizar la inscripción:', error);
                alert('Error al actualizar la inscripción');
            }
        });
    }

    closeEdit() {
        this.selectedEnrollment = null;
    }
}
