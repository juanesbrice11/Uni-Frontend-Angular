import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Edit, Trash2 } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-enrollments-list',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule, NgxPaginationModule],
    templateUrl: './enrollments-list.component.html'
})
export class EnrollmentsListComponent implements OnInit {
    readonly EditIcon = Edit;  
    readonly TrashIcon = Trash2;
    apiUrl = 'http://localhost:3000/enrollments';
    studentsUrl = 'http://localhost:3000/students';
    coursesUrl = 'http://localhost:3000/courses';

    enrollments: any[] = [];
    students: any[] = [];
    courses: any[] = [];
    selectedEnrollment: any = null;

    page: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = 1;

    constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.loadEnrollments();
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
                this.totalPages = Math.ceil(this.enrollments.length / this.itemsPerPage);
            },
            error: (error) => {
                console.error('Error al cargar inscripciones:', error);
            }
        });
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
        this.router.navigate(['/enrollment-edit', enrollment.id]);
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
}
