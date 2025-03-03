import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-assessments-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './assessments-list.component.html'
})
export class AssessmentsListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/assessments';
    assessments: any[] = [];
    selectedAssessment: any = null;

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
            },
            error: (error) => {
                console.error('Error al cargar las evaluaciones:', error);
            }
        });
    }

    deleteAssessment(id: number) {
        if (confirm('¿Estás seguro de eliminar esta evaluación?')) {
            const token = this.authService.getToken(); 
    
            if (!token) {
                alert('No tienes permisos para realizar esta acción');
                return;
            }
    
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
        const token = this.authService.getToken();
    
        if (!token) {
            alert('No tienes permisos para editar esta evaluación');
            return;
        }
    
        if (!updatedAssessment.id) { 
            console.error('La evaluación no tiene un ID válido:', updatedAssessment);
            alert('Error: La evaluación no tiene un ID válido');
            return;
        }
    
        this.http.patch(`${this.apiUrl}/${updatedAssessment.id}`, updatedAssessment, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
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
}
