import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-assessment-edit',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './assessment-edit.component.html'
})
export class AssessmentEditComponent implements OnInit {
    apiUrl = 'http://localhost:3000/assessments';
    assessment: { id?: number; courseId: string; name: string; date: string } = { id: undefined , courseId: '', name: '', date: '' };
    courses: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
        const assessmentId = this.route.snapshot.paramMap.get('id');
        if (assessmentId) {
            this.loadAssessment(assessmentId);
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

    loadAssessment(id: string) {
        this.http.get(`${this.apiUrl}/${id}`).subscribe({
            next: (data: any) => {
                this.assessment = data;
                this.assessment.id = Number(id); 
            },
            error: (error) => console.error('Error al cargar la evaluación:', error)
        });
    }
    
    

    loadCourses() {
        this.http.get<any[]>('http://localhost:3000/courses').subscribe({
            next: (data) => (this.courses = data),
            error: (error) => console.error('Error al cargar cursos:', error)
        });
    }

    saveChanges() {
        this.assessment.id = Number(this.assessment.id);  // 👈 Convierte id a número
    
        console.log('Enviando datos:', this.assessment); // Revisa en consola
    
        this.http.patch(`${this.apiUrl}/${this.assessment.id}`, this.assessment, this.getHeaders()).subscribe({
            next: () => {
                alert('Evaluación actualizada con éxito');
                this.router.navigate(['/assessments']);
            },
            error: (error) => {
                console.error('Error al actualizar la evaluación:', error);
                alert('Error al actualizar la evaluación');
            }
        });
    }
    


    cancel() {
        this.router.navigate(['/assessments']);
    }
}
