import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-departments',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './departments.component.html',
    })
    export class DepartmentsComponent {
    apiUrl = 'http://localhost:3000/departments'; 
    department = { name: '' };

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

    saveDepartment() {
        const token = this.authService.getToken();
        if (!token) {
            alert('No tienes permisos para realizar esta acción');
            return;
        }
        this.http.post(this.apiUrl, this.department, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
            next: () => {
                alert('Departamento guardado con éxito');
                this.department = { name: '' };
            },
            error: () => alert('Error al guardar el departamento')
        });
    }
    
    goToDepartmentsList() {
        this.router.navigate(['/departments-list']);
    }
}
