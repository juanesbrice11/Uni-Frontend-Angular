import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-assessments-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        LucideAngularModule
    ],
    templateUrl: './assessments-list.component.html'
})
export class AssessmentsListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/assessments';
    assessments: any[] = [];
    selectedAssessment: any = null;
    page: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = 1;

    constructor(
        private http: HttpClient, 
        private authService: AuthService, 
        private router: Router
    ) {}

    ngOnInit() {
        this.loadAssessments();
    }

    getHeaders() {
        const token = this.authService.getToken(); 
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadAssessments() {
        this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.assessments = data;
                this.totalPages = Math.ceil(this.assessments.length / this.itemsPerPage);
            },
            error: (error) => {
                console.error('Error al cargar las evaluaciones:', error);
            }
        });
    }

    deleteAssessment(id: number) {
        if (confirm('¿Estás seguro de eliminar esta evaluación?')) {
            this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders()).subscribe({
                next: () => {
                    alert('Evaluación eliminada correctamente');
                    this.loadAssessments();
                },
                error: (error) => {
                    console.error('Error al eliminar la evaluación:', error);
                    alert('Error al eliminar la evaluación');
                }
            });
        }
    }

    editAssessment(assessment: any) {
        this.router.navigate(['/assessment-edit', assessment.id]);  
    }

    updateAssessment(updatedAssessment: any) {
        if (!updatedAssessment.id) { 
            alert('Error: La evaluación no tiene un ID válido');
            return;
        }

        this.http.patch(`${this.apiUrl}/${updatedAssessment.id}`, updatedAssessment, this.getHeaders()).subscribe({
            next: () => {
                alert('Evaluación actualizada con éxito');
                this.loadAssessments();
                this.selectedAssessment = null;
            },
            error: (error) => {
                console.error('Error al actualizar la evaluación:', error);
                alert('Error al actualizar la evaluación');
            }
        });
    }

    closeEdit() {
        this.selectedAssessment = null;
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
