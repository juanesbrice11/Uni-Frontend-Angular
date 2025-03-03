import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StudentsRoutingModule,
    StudentsComponent 
  ]
})
export class StudentsModule { }
