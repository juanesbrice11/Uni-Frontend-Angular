import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssessmentsRoutingModule } from './assessments-routing.module';
import { AssessmentsComponent } from './assessments.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    AssessmentsRoutingModule, 
    AssessmentsComponent,
  ]
})
export class AssessmentsModule { }
