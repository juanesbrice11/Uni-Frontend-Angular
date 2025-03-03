import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-courses-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/courses';
    courses: any[] = [];
    selectedCourse: any = null;

    constructor(
        private http: HttpClient, 
        private authService: AuthService, 
        private router: Router
    ) {}

    professors: any[] = []; 

    ngOnInit() {
        this.loadCourses();
        this.loadProfessors();
    }

    getHeaders() {
        const token = localStorage.getItem('token'); 
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadCourses() {
        this.http.get<any[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.courses = data;
            },
            error: (error) => {
                console.error('Error al cargar los cursos:', error);
            }
        });
    }

    loadProfessors() {
        this.http.get<any[]>('http://localhost:3000/professors').subscribe({
            next: (data) => {
                this.professors = data;
            },
            error: (error) => {
                console.error('Error al cargar profesores:', error);
            }
        });
    }

    deleteCourse(id: number) {
        if (confirm('¿Estás seguro de eliminar este curso?')) {
            const token = this.authService.getToken(); 
    
            if (!token) {
                alert('No tienes permisos para realizar esta acción');
                return;
            }
    
            this.http.delete(`${this.apiUrl}/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).subscribe({
                next: () => {
                    alert('Curso eliminado correctamente');
                    this.loadCourses(); 
                },
                error: (error) => {
                    console.error('Error al eliminar el curso:', error);
                    alert('Error al eliminar el curso');
                }
            });
        }
    }

    editCourse(course: any) {
        const professor = this.professors.find(p => p.id === course.professorId);
        this.selectedCourse = { 
            ...course, 
            professorName: professor ? professor.name : 'No asignado' 
        };
    }

    updateCourse(updatedCourse: any) {
        const token = this.authService.getToken();
        
        if (!token) {
            alert('No tienes permisos para editar este curso');
            return;
        }
    
        this.http.put(`${this.apiUrl}/${updatedCourse.id}`, updatedCourse, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
            next: () => {
                alert('Curso actualizado con éxito');
                this.loadCourses(); 
                this.selectedCourse = null;
            },
            error: (error) => {
                console.error('Error al actualizar el curso:', error);
                alert('Error al actualizar el curso');
            }
        });
    }

    closeEdit() {
        this.selectedCourse = null;
    }
}
