import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-grades-edit',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './grades-edit.component.html',
})
export class GradesEditComponent implements OnInit {

    apiUrl = 'http://localhost:3000/grades'; 
    studentUrl = 'http://localhost:3000/students';
    assessmentUrl = 'http://localhost:3000/assessments';

    students: any[] = [];
    assessments: any[] = [];
    grade = { studentId: '', assessmentId: '', score: '' };
    gradeId: string | null = null;

    constructor(
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.gradeId = this.route.snapshot.paramMap.get('id'); 
        if (this.gradeId) {
            this.loadGrade();
        }
        this.loadStudents();
        this.loadAssessments();
    }

    loadStudents() {
        this.http.get<any[]>(this.studentUrl).subscribe({
            next: (data) => this.students = data,
            error: (error) => console.error('Error al cargar estudiantes:', error)
        });
    }

    loadAssessments() {
        this.http.get<any[]>(this.assessmentUrl).subscribe({
            next: (data) => this.assessments = data,
            error: (error) => console.error('Error al cargar evaluaciones:', error)
        });
    }

    loadGrade() {
        this.http.get<any>(`${this.apiUrl}/${this.gradeId}`).subscribe({
            next: (data) => {
                this.grade = {
                    studentId: data.student.id, 
                    assessmentId: data.assessment.id,
                    score: data.score
                };
            },
            error: (error) => {
                console.error('Error al cargar la calificación:', error);
                alert('Error al cargar la calificación');
            }
        });
    }

    updateGrade() {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('No tienes permisos para editar esta calificación');
            return;
        }

        const headers = { 'Authorization': `Bearer ${token}` };

        this.http.patch(`${this.apiUrl}/${this.gradeId}`, this.grade, { headers }).subscribe({
            next: () => {
                alert('Calificación actualizada con éxito');
                this.router.navigate(['/grades-list']);
            },
            error: (error) => {
                console.error('Error al actualizar la calificación:', error);
                alert('Error al actualizar la calificación');
            }
        });
    }
}
