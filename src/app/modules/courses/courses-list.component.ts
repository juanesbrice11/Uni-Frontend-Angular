import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-courses-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        LucideAngularModule
    ],
    templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/courses';
    courses: any[] = [];
    selectedCourse: any = null;
    page: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = 1;

    constructor(
        private http: HttpClient, 
        private authService: AuthService, 
        private router: Router
    ) {}

    ngOnInit() {
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

    loadCourses() {
        this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.courses = data;
                this.totalPages = Math.ceil(this.courses.length / this.itemsPerPage);
            },
            error: (error) => {
                console.error('Error al cargar los cursos:', error);
            }
        });
    }

    deleteCourse(id: number) {
        if (confirm('¿Estás seguro de eliminar este curso?')) {
            this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders()).subscribe({
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
        this.router.navigate(['/course-edit', course.id]);  
    }

    updateCourse(updatedCourse: any) {
        if (!updatedCourse.id) { 
            alert('Error: El curso no tiene un ID válido');
            return;
        }

        this.http.patch(`${this.apiUrl}/${updatedCourse.id}`, updatedCourse, this.getHeaders()).subscribe({
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

    // Métodos de paginación
    previousPage() {
        if (this.page > 1) {
            this.page--;
        }
    }

    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
        }
    }

    viewPrerequisites(courseId: number) {
        this.router.navigate(['/course-prerequisites', courseId]);  
    }
}
