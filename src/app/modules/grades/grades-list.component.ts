import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Edit, Trash2 } from 'lucide-angular';

@Component({
    selector: 'app-grades-list',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './grades-list.component.html',
})
export class GradesListComponent implements OnInit {
    readonly EditIcon = Edit;  
    readonly TrashIcon = Trash2;
    apiUrl = 'http://localhost:3000/grades';
    grades: any[] = [];

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit() {
        this.loadGrades();
    }

    loadGrades() {
        this.http.get<any[]>(this.apiUrl).subscribe({
            next: (data) => {
                this.grades = data.map(grade => ({
                    ...grade,
                    studentName: grade.student?.name || 'Desconocido',
                    assessmentName: grade.assessment?.name || 'Desconocido'
                }));
            },
            error: (error) => console.error('Error al cargar calificaciones:', error)
        });
    }

    editGrade(gradeId: number) {
        this.router.navigate(['/grades-edit', gradeId]);
    }

    deleteGrade(gradeId: number) {
        if (confirm('¿Estás seguro de eliminar esta calificación?')) {
            const token = localStorage.getItem('token');
    
            if (!token) {
                alert('No tienes permisos para eliminar esta calificación');
                return;
            }
    
            const headers = { 'Authorization': `Bearer ${token}` };
    
            this.http.delete(`${this.apiUrl}/${gradeId}`, { headers }).subscribe({
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
}

