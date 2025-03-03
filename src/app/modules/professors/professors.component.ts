import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-professors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professors.component.html',
})
export class ProfessorsComponent implements OnInit {
  apiUrl = 'http://localhost:3000/professors';
  departmentsUrl = 'http://localhost:3000/departments'; 
  professor = { name: '', hireDate: '', departmentId: '' };
  departments: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.http.get<any[]>(this.departmentsUrl).subscribe({
      next: (data) => {
        this.departments = data;
      },
      error: (error) => {
        console.error('Error al cargar departamentos:', error);
      }
    });
  }

  saveProfessor() {
  console.log('Profesor creado correctamente', this.professor);

   this.http.post(this.apiUrl, this.professor).subscribe({
      next: (response) => {
        console.log('Profesor guardado:', response);
        alert('Profesor guardado con éxito');
        this.professor = { name: '', hireDate: '', departmentId: '' };
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar el profesor');
      }
    }); 
  }
}
