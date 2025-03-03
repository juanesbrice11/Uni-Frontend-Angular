import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-departments-list',
    imports: [ FormsModule, CommonModule],
    templateUrl: './departments-list.component.html',
    })
    export class DepartmentsListComponent implements OnInit {
    apiUrl = 'http://localhost:3000/departments';
    departments: any[] = [];

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

    ngOnInit() {
        this.fetchDepartments();
    }

    fetchDepartments() {
        this.http.get(this.apiUrl).subscribe({
        next: (data: any) => {
            this.departments = data;
        },
        error: (error) => {
            console.error('Error al obtener los departamentos:', error);
        },
        });
    }

    editDepartment(id: number) {
        this.router.navigate(['/departments-edit', id]);
    }

    deleteDepartment(id: number) {
        const token = this.authService.getToken();

        if (!token) {
        alert('No tienes permisos para eliminar');
        return;
        }

        if (confirm('¿Estás seguro de eliminar este departamento?')) {
        this.http.delete(`${this.apiUrl}/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        }).subscribe({
            next: () => {
            alert('Departamento eliminado con éxito');
            this.fetchDepartments();
            },
            error: (error) => {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el departamento');
            },
        });
        }
    }
}
