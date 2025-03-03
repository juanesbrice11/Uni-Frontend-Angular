import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedules.component.html',
})
export class SchedulesComponent {

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  apiUrl = 'http://localhost:3000/schedules';
  coursesUrl = 'http://localhost:3000/courses'; 

  schedule = { day: '', startTime: '', endTime: '', courseId:'' };
  courses: any[] = [];

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.http.get<any[]>(this.coursesUrl).subscribe({
      next: (data) => this.courses = data,
      error: (error) => console.error('Error al cargar cursos:', error)
    });
  }

  saveSchedule() {
    const token = this.authService.getToken();
    if (!token) {
      alert('No tienes permisos para realizar esta acción');
      return;
    }

    this.http.post(this.apiUrl, this.schedule, {
        headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
        next: () => {
            alert('Horario guardado con éxito');
            this.schedule = { day: '', startTime: '', endTime: '', courseId: '' };
        },
        error: () => alert('Error al guardar el horario')
    });
  }

  goToScheduleList() {
    this.router.navigate(['/schedules-list']);
  }
}
