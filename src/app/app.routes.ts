import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './modules/students/students.component';
import { AssessmentsComponent } from './modules/assessments/assessments.component';
import { CoursesComponent } from './modules/courses/courses.component';
import { DepartmentsComponent } from './modules/departments/departments.component';
import { ProfessorsComponent } from './modules/professors/professors.component';
import { EnrollmentsComponent } from './modules/enrollments/enrollments.component';
import { GradesComponent } from './modules/grades/grades.component';
import { SchedulesComponent } from './modules/schedules/schedules.component';

import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CoursesListComponent } from './modules/courses/courses-list.component';
import { StudentsListComponent } from './modules/students/students-list.component';
import { EnrollmentsListComponent } from './modules/enrollments/enrollments-list.component';

export const routes: Routes = [


  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'students-list', component: StudentsListComponent, canActivate: [AuthGuard] },
  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] }, 
  { path: 'courses-list', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'professors', component: ProfessorsComponent, canActivate: [AuthGuard] }, 
  { path: 'enrollments', component: EnrollmentsComponent, canActivate: [AuthGuard] }, 
  { path: 'enrollments-list', component: EnrollmentsListComponent, canActivate: [AuthGuard] },
  { path: 'grades', component: GradesComponent, canActivate: [AuthGuard] }, 
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: '/login' }, 
  
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}