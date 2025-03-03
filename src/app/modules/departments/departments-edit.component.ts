import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-departments-edit',
    imports: [CommonModule, FormsModule],
    templateUrl: './departments-edit.component.html',
    })
    export class DepartmentsEditComponent implements OnInit {
    apiUrl = 'http://localhost:3000/departments';
    department: any = { name: '' };
    departmentId: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.departmentId = this.route.snapshot.paramMap.get('id');
        if (this.departmentId) {
        this.fetchDepartment();
        }
    }

    fetchDepartment() {
        this.http.get(`${this.apiUrl}/${this.departmentId}`).subscribe({
        next: (data: any) => {
            this.department = data;
        },
        error: (error) => {
            console.error('Error al obtener el departamento:', error);
        },
        });
    }

    updateDepartment() {
        const token = this.authService.getToken();

        if (!token) {
        alert('No tienes permisos para actualizar');
        return;
        }

        this.http.patch(`${this.apiUrl}/${this.departmentId}`, this.department, {
        headers: { Authorization: `Bearer ${token}` },
        }).subscribe({
        next: () => {
            alert('Departamento actualizado con éxito');
            this.router.navigate(['/departments-list']);
        },
        error: (error) => {
            console.error('Error al actualizar:', error);
            alert('Error al actualizar el departamento');
        },
        });
    }

    cancel() {
        this.router.navigate(['/departments-list']);
    }
}
