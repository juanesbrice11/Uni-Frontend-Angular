import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Edit, Trash2 } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-departments-list',
    standalone: true,
    imports: [FormsModule, CommonModule, LucideAngularModule, NgxPaginationModule],
    templateUrl: './departments-list.component.html',
})
export class DepartmentsListComponent implements OnInit {
    readonly EditIcon = Edit;
    readonly TrashIcon = Trash2;
    apiUrl = 'http://localhost:3000/departments';
    departments: any[] = [];
    
    page: number = 1;
    itemsPerPage: number = 5;
    totalPages: number = 1;

    constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

    ngOnInit() {
        this.fetchDepartments();
    }

    getHeaders() {
        const token = this.authService.getToken();
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
    }

    fetchDepartments() {
        this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
            next: (data) => {
                this.departments = data;
                this.totalPages = Math.ceil(this.departments.length / this.itemsPerPage);
            },
            error: (error) => {
                console.error('Error al obtener los departamentos:', error);
            }
        });
    }

    editDepartment(id: number) {
        this.router.navigate(['/departments-edit', id]);
    }

    deleteDepartment(id: number) {
        if (confirm('¿Estás seguro de eliminar este departamento?')) {
            this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders()).subscribe({
                next: () => {
                    alert('Departamento eliminado con éxito');
                    this.fetchDepartments();
                },
                error: (error) => {
                    console.error('Error al eliminar:', error);
                    alert('Error al eliminar el departamento');
                }
            });
        }
    }

    // Métodos de paginación
    previousPage() {
        if (this.page > 1) {
            this.page--;
        }
    }

    nextPage() {
        if (this.page < this.totalPages) {
            this.page++;
        }
    }
}
