import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { FormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    DepartmentsComponent
  ]
})
export class DepartmentsModule { }
