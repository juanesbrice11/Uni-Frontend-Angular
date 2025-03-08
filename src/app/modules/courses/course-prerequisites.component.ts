import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-prerequisites',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './course-prerequisites.component.html',
})
export class CoursesPrerequisitesComponent implements OnInit {
  prerequisites: any[] = [];
  courseId: string | null = null;
  apiUrl = 'http://localhost:3000/courses'; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    
    if (this.courseId) {
      this.loadPrerequisites();
    }
  }

  loadPrerequisites() {
    this.http.get<any[]>(`${this.apiUrl}/${this.courseId}/prerequisites`).subscribe({
      next: (data) => {
        this.prerequisites = data;
      },
      error: (error) => {
        console.error('Error al obtener los prerrequisitos:', error);
      }
    });
  }

  goBack() {
    this.router.navigate(['/courses-list']);
  }
}
