import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-grades-list',
    standalone: true,
    imports: [CommonModule, FormsModule, NgxPaginationModule, LucideAngularModule],
    templateUrl: './grades-list.component.html',
})
export class GradesListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/grades';
    grades: any[] = [];
    page: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = 1;

    constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.loadGrades();
    }

    getHeaders() {
        const token = this.authService.getToken(); 
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadGrades() {
        this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.grades = data.map(grade => ({
                    ...grade,
                    studentName: grade.student?.name || 'Desconocido',
                    assessmentName: grade.assessment?.name || 'Desconocido'
                }));
                this.totalPages = Math.ceil(this.grades.length / this.itemsPerPage);
            },
            error: (error) => console.error('Error al cargar calificaciones:', error)
        });
    }

    editGrade(gradeId: number) {
        this.router.navigate(['/grades-edit', gradeId]);
    }

    deleteGrade(gradeId: number) {
        if (confirm('¿Estás seguro de eliminar esta calificación?')) {
            this.http.delete(`${this.apiUrl}/${gradeId}`, this.getHeaders()).subscribe({
                next: () => {
                    alert('Calificación eliminada con éxito');
                    this.loadGrades();
                },
                error: (error) => {
                    console.error('Error al eliminar la calificación:', error);
                    alert('Error al eliminar la calificación');
                }
            });
        }
    }

    goBack() {
        this.router.navigate(['/grades']);
    }

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
