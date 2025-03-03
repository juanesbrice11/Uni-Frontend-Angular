import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-course-edit',
    standalone: true,
    imports: [ FormsModule, CommonModule],
    templateUrl: './course-edit.component.html'
})
export class CourseEditComponent implements OnInit {
    apiUrl = 'http://localhost:3000/courses';
    professorsUrl = 'http://localhost:3000/professors';

    course: any = { name: '', description: '', professorId: '', prerequisiteIds: [] };
    professors: any[] = [];
    prerequisites: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
        const courseId = this.route.snapshot.paramMap.get('id');
        if (courseId) {
            this.loadCourse(courseId);
            this.loadProfessors();
            this.loadCourses();
        }
    }

    getHeaders() {
        const token = localStorage.getItem('token'); 
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadCourse(id: string) {
        this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
            next: (data) => {
                this.course = data;
                this.course.prerequisiteIds = this.course.prerequisiteIds || [];
            },
            error: (error) => console.error('Error al cargar el curso:', error)
        });
    }

    loadProfessors() {
        this.http.get<any[]>(this.professorsUrl).subscribe({
            next: (data) => (this.professors = data),
            error: (error) => console.error('Error al cargar profesores:', error)
        });
    }

    loadCourses() {
        this.http.get<any[]>(this.apiUrl).subscribe({
            next: (data) => (this.prerequisites = data),
            error: (error) => console.error('Error al cargar cursos:', error)
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

    saveChanges() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('No tienes permisos para editar este curso');
            return;
        }

        this.http.patch(`${this.apiUrl}/${this.course.id}`, this.course, this.getHeaders()).subscribe({
            next: () => {
                alert('Curso actualizado con éxito');
                this.router.navigate(['/courses']);
            },
            error: (error) => {
                console.error('Error al actualizar el curso:', error);
                alert('Error al actualizar el curso');
            }
        });
    }

    cancel() {
        this.router.navigate(['/courses']);
    }
}
