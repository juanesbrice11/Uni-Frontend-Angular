import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  student = { studentId: '', name: '', birthDate: '' };

  saveStudent() {
    console.log('Estudiante guardado:', this.student);
  }
}
