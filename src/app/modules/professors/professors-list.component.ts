import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule, Edit, Trash2 } from 'lucide-angular';

@Component({
    selector: 'app-professors-list',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './professors-list.component.html'
})
export class ProfessorsListComponent implements OnInit {
    readonly EditIcon = Edit;  
    readonly TrashIcon = Trash2;
    apiUrl = 'http://localhost:3000/professors';
    departmentsUrl = 'http://localhost:3000/departments';

    professors: any[] = [];
    departments: any[] = [];
    selectedProfessor: any = null;

    constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

    ngOnInit() {
        this.loadProfessors();
        this.loadDepartments();
    }

    getHeaders() {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    loadProfessors() {
        this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.professors = data;
            },
            error: (error) => {
                console.error('Error al cargar profesores:', error);
            }
        });
    }

    loadDepartments() {
        this.http.get<any[]>(this.departmentsUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.departments = data;
            },
            error: (error) => {
                console.error('Error al cargar departamentos:', error);
            }
        });
    }

    getDepartmentName(departmentId: string): string {
        const department = this.departments.find(d => d.id === departmentId);
        return department ? department.name : 'Desconocido';
    }

    deleteProfessor(id: number) {
        if (confirm('¿Estás seguro de eliminar este profesor?')) {
            this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders()).subscribe({
                next: () => {
                    alert('Profesor eliminado correctamente');
                    this.loadProfessors();
                },
                error: (error) => {
                    console.error('Error al eliminar el profesor:', error);
                    alert('Error al eliminar el profesor');
                }
            });
        }
    }

    editProfessor(professor: any) {
        this.router.navigate(['/professor-edit', professor.id]);  
    }

    updateProfessor() {
        this.http.put(`${this.apiUrl}/${this.selectedProfessor.id}`, this.selectedProfessor, this.getHeaders()).subscribe({
            next: () => {
                alert('Profesor actualizado con éxito');
                this.loadProfessors();
                this.selectedProfessor = null;
            },
            error: (error) => {
                console.error('Error al actualizar el profesor:', error);
                alert('Error al actualizar el profesor');
            }
        });
    }

    closeEdit() {
        this.selectedProfessor = null;
    }
}
