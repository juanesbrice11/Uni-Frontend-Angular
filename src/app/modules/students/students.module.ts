import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component'; // <-- IMPORTAR AQUÍ

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StudentsRoutingModule,
    StudentsComponent // <-- IMPORTAR AQUÍ EN LUGAR DE DECLARARLO
  ]
})
export class StudentsModule { }
