import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './modules/students/students.component';
import { AssessmentsComponent } from './modules/assessments/assessments.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { DepartmentsComponent } from './modules/departments/departments.component';

export const routes: Routes = [

  { path: '', redirectTo: '/students', pathMatch: 'full' },
  
  { path: 'students', component: StudentsComponent },
  { path: 'assessments', component: AssessmentsComponent },
  { path: 'assessments', component: AssessmentsComponent }, 
  { path: 'courses', component: CoursesComponent }, 
  { path: 'department', component: DepartmentsComponent }, 




];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}