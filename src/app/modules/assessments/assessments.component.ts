import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assessments',
  imports: [CommonModule, FormsModule],
  templateUrl: './assessments.component.html',
  styleUrl: './assessments.component.css'
})
export class AssessmentsComponent {
  assessment = { course: '', name: '', date: '' };

  saveAssessment() {
    console.log('Evaluacion guardada:', this.assessment); console
  }
}
