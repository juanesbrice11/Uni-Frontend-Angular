import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-schedules-edit',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './schedules-edit.component.html',
    })
    export class SchedulesEditComponent implements OnInit {
    apiUrl = 'http://localhost:3000/schedules';
    schedule = { id: 0, day: '', startTime: '', endTime: '' };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) {}

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.http.get(`${this.apiUrl}/${id}`).subscribe({
        next: (data: any) => {
            this.schedule = data;
        },
        error: (error) => console.error('Error al obtener el horario:', error),
        });
    }

    updateSchedule() {
        const token = this.authService.getToken();
        if (!token) {
        alert('No tienes permisos para actualizar este horario');
        return;
        }

        this.http.put(`${this.apiUrl}/${this.schedule.id}`, this.schedule, {
        headers: { Authorization: `Bearer ${token}` },
        }).subscribe({
        next: () => {
            alert('Horario actualizado con éxito');
            this.router.navigate(['/schedules-list']);
        },
        error: () => alert('Error al actualizar el horario'),
        });
    }
}
