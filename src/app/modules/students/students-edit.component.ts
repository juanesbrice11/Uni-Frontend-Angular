import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-student-edit',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './students-edit.component.html'
})
export class StudentEditComponent implements OnInit {
    apiUrl = 'http://localhost:3000/students';
    student: any = { studentId: '', name: '', birthDate: '' };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
        const studentId = this.route.snapshot.paramMap.get('id');
        if (studentId) {
            this.loadStudent(studentId);
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

    loadStudent(id: string) {
        this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
            next: (data) => {
                this.student = data;
            },
            error: (error) => console.error('Error al cargar el estudiante:', error)
        });
    }

    saveChanges() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('No tienes permisos para editar este estudiante');
            return;
        }
    
        const updateData = {
            id: this.student.id,  
            name: this.student.name,
            birthDate: this.student.birthDate
        };
        

        console.log('Datos enviados para actualización:', updateData);
    
        this.http.patch(`${this.apiUrl}/${this.student.id}`, updateData, this.getHeaders())
            .subscribe({
                next: () => {
                    alert('Estudiante actualizado con éxito');
                    this.router.navigate(['/students']);
                },
                error: (error) => {
                    console.error('Error al actualizar el estudiante:', error);
                    alert('Error al actualizar el estudiante');
                }
            });
    }
    

    cancel() {
        this.router.navigate(['/students']);
    }
}
