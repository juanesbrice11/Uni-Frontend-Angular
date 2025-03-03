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
  apiUrl = 'http://localhost:3000/enrollments';
  studentsUrl = 'http://localhost:3000/departments'; 
  professorsUrl = 'http://localhost:3000/professors'; 
  schedule = { studentId: '', courseId: '', enrollmentDate: '' };
  students: any[] = []; 
  

}
