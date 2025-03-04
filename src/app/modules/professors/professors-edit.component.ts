import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit-professor',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './professors-edit.component.html',
})
export class EditProfessorComponent implements OnInit {
    apiUrl = 'http://localhost:3000/professors';
    departmentsUrl = 'http://localhost:3000/departments';
    
    professor: any = { id: '', name: '', hireDate: '', departmentId: '' };
    departments: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
        const professorId = this.route.snapshot.paramMap.get('id');
        if (professorId) {
            this.loadProfessor(professorId);
        }
        this.loadDepartments();
    }

    getHeaders() {
        const token = localStorage.getItem('token');
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadProfessor(id: string) {
        this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
            next: (data) => {
                this.professor = data;
            },
            error: (error) => console.error('Error al cargar el profesor:', error)
        });
    }

    loadDepartments() {
        this.http.get<any[]>(this.departmentsUrl).subscribe({
            next: (data) => {
                this.departments = data;
            },
            error: (error) => console.error('Error al cargar los departamentos:', error)
        });
    }

    saveChanges() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('No tienes permisos para editar este profesor');
            return;
        }

        const updateData = {
            id: this.professor.id,  
            name: this.professor.name,
            hireDate: this.professor.hireDate,
            departmentId: this.professor.departmentId
        };

        console.log('Datos enviados para actualización:', updateData);

        this.http.patch(`${this.apiUrl}/${this.professor.id}`, updateData, this.getHeaders())
            .subscribe({
                next: () => {
                    alert('Profesor actualizado con éxito');
                    this.router.navigate(['/professors']);
                },
                error: (error) => {
                    console.error('Error al actualizar el profesor:', error);
                    alert('Error al actualizar el profesor');
                }
            });
    }

    cancel() {
        this.router.navigate(['/professors']);
    }
}
