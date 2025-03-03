import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

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
    const token = this.authService.getToken(); 
    console.log('Token enviado en la petición:', token);

    if (!token) {
        alert('No tienes permisos para realizar esta acción');
        return;
    }

    this.http.post(this.apiUrl, this.professor, {
        headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
        next: (response) => {
            console.log('Profesor guardado:', response);
            alert('Profesor guardado con éxito');
            this.professor = { name: '', hireDate: '', departmentId: '' };
        },
        error: (error) => {
            console.error('Error al guardar el profesor:', error);
            alert('Error al guardar el profesor');
        }
    });
}

}
