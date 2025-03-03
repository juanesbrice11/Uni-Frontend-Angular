import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-students-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './students-list.component.html'
})
export class StudentsListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/students';
    students: any[] = [];
    selectedStudent: any = null;

    constructor(
        private http: HttpClient, 
        private authService: AuthService, 
        private router: Router
    ) {}

    ngOnInit() {
        this.loadStudents();
    }

    getHeaders() {
        const token = this.authService.getToken(); 
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadStudents() {
        this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.students = data;
            },
            error: (error) => {
                console.error('Error al cargar los estudiantes:', error);
            }
        });
    }

    deleteStudent(id: number) {
        if (confirm('¿Estás seguro de eliminar este estudiante?')) {
            const token = this.authService.getToken(); 
    
            if (!token) {
                alert('No tienes permisos para realizar esta acción');
                return;
            }
    
            this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders()).subscribe({
                next: () => {
                    alert('Estudiante eliminado correctamente');
                    this.loadStudents(); 
                },
                error: (error) => {
                    console.error('Error al eliminar el estudiante:', error);
                    alert('Error al eliminar el estudiante');
                }
            });
        }
    }

    editStudent(student: any) {
        this.selectedStudent = { ...student };
    }

    updateStudent(updatedStudent: any) {
        const token = this.authService.getToken();
        
        if (!token) {
            alert('No tienes permisos para editar este estudiante');
            return;
        }
    
        this.http.put(`${this.apiUrl}/${updatedStudent.studentId}`, updatedStudent, this.getHeaders()).subscribe({
            next: () => {
                alert('Estudiante actualizado con éxito');
                this.loadStudents(); 
                this.selectedStudent = null;
            },
            error: (error) => {
                console.error('Error al actualizar el estudiante:', error);
                alert('Error al actualizar el estudiante');
            }
        });
    }

    closeEdit() {
        this.selectedStudent = null;
    }
}
