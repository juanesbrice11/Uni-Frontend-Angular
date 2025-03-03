import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-schedules-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './schedules-list.component.html',
    })
    export class SchedulesListComponent {
    schedules: any[] = [];
    courses: any[] = [];
    apiUrl = 'http://localhost:3000/schedules';
    coursesUrl = 'http://localhost:3000/courses';

    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

    ngOnInit() {
        this.loadCourses();
    }

    loadCourses() {
        this.http.get<any[]>(this.coursesUrl).subscribe({
        next: (data) => {
            this.courses = data;
            this.loadSchedules(); 
        },
        error: (error) => console.error('Error al cargar cursos:', error)
        });
    }

    loadSchedules() {
        this.http.get<any[]>(this.apiUrl).subscribe({
            next: (data) => {
            console.log('Horarios recibidos:', data);
            console.log('Cursos disponibles:', this.courses);
        
            this.schedules = data.map(schedule => {
                const course = this.courses.find(c => String(c.id) === String(schedule.courseId)); 
                console.log(`Buscando curso para schedule.courseId=${schedule.courseId}, encontrado:`, course);
        
                return {
                ...schedule,
                courseName: course ? course.name : 'Curso no encontrado'
                };
            });
            },
            error: (error) => console.error('Error al cargar los horarios:', error)
        });
    }
      

    editSchedule(id: number) {
        this.router.navigate(['/schedules-edit', id]);
    }

    deleteSchedule(id: number) {
        const token = this.authService.getToken();
        if (!token) {
        alert('No tienes permisos para eliminar este horario');
        return;
        }

        if (confirm('¿Estás seguro de eliminar este horario?')) {
        this.http.delete(`${this.apiUrl}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
            next: () => {
            alert('Horario eliminado con éxito');
            this.loadSchedules();
            },
            error: () => alert('Error al eliminar el horario')
        });
        }
    }
}
