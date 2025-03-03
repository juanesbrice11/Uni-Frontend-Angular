import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-course-edit-modal',  
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './course-edit-modal.component.html'
    })
    export class CourseEditModalComponent {
    @Input() selectedCourse: any; // 🔹 Recibe el curso desde CoursesListComponent
    @Input() course: any; 
    @Output() close = new EventEmitter<void>(); 

    saveChanges() {
        console.log('Guardando cambios:', this.course);
        alert('Cambios guardados con éxito');
        this.close.emit(); 
    }

    closeModal() {
        this.close.emit();
    }
}
