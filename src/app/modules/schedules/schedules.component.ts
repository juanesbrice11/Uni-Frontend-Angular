import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedules.component.html',
})
export class SchedulesComponent {

  constructor(private http: HttpClient) {}

  apiUrl = 'http://localhost:3000/schedules';
  coursesUrl = 'http://localhost:3000/courses'; 

  schedule = { day: '', startTime: '', endTime: '', courseId:'' };
  
  courses: any[] = [];

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.http.get<any[]>(this.coursesUrl).subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
      }
    });
  }

  saveSchedule() {
    console.log('Horario guardado:', this.schedule);

    this.http.post(this.apiUrl, this.schedule).subscribe({
      next: (response) => {
        console.log('Horario guardado:', response);
        alert('Horario guardado con éxito');
        this.schedule = { day: '', startTime: '', endTime: '', courseId:'' };
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        alert('Error al guardar el horario');
      }
    });
  }

}
