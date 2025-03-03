import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.component.html',
})
export class DepartmentsComponent {
  apiUrl = 'http://localhost:3000/departments'; 

  department = { name: '' };

  constructor(private http: HttpClient) {} 

  saveDepartment() {
    this.http.post(this.apiUrl, this.department).subscribe({
      next: (response) => {
        console.log('Departamento guardado:', response);
        alert('Departamento guardado con éxito');
        this.department = { name: '' };
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar el departamento');
      }
    });
  }
}
