import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-courses-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './courses-list.component.html'
    })
    export class CoursesListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/courses';
    courses: any[] = [];
    


    constructor(
        private http: HttpClient, 
        private authService: AuthService, 
        private router: Router
    ) {}
    
    ngOnInit() {
        this.loadCourses();
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

    deleteCourse(id: number) {
        if (confirm('¿Estás seguro de eliminar este curso?')) {
            const token = this.authService.getToken(); 
            console.log('Token enviado en la petición:', token);
    
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
    
    

    editCourse(id: number) {
        this.router.navigate(['/edit-course', id]);
    }
}
