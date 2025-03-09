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
import { CourseEditComponent } from './modules/courses/course-edit.component';
import { CoursesPrerequisitesComponent } from './modules/courses/course-prerequisites.component';
import { ProfessorsListComponent } from './modules/professors/professors-list.component';
import { StudentEditComponent } from './modules/students/students-edit.component';
import { DepartmentsEditComponent } from './modules/departments/departments-edit.component';
import { DepartmentsListComponent } from './modules/departments/departments-list.component';
import { SchedulesListComponent } from './modules/schedules/schedules-list.component';
import { SchedulesEditComponent } from './modules/schedules/schedules-edit.component';

import { AssessmentsListComponent } from './modules/assessments/assessments-list.component';
import { AssessmentEditComponent } from './modules/assessments/assessment-edit.component';

import { EditEnrollmentComponent } from './modules/enrollments/enrollments-edit.component';

import { EditProfessorComponent } from './modules/professors/professors-edit.component';
import { GradesListComponent } from './modules/grades/grades-list.component';
import { GradesEditComponent } from './modules/grades/grades-edit.component';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [


  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'course-edit/:id', component: CourseEditComponent, canActivate: [AuthGuard]  },
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },
  { path: 'students-list', component: StudentsListComponent, canActivate: [AuthGuard] },
  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthGuard] },
  { path: 'assessments-list', component: AssessmentsListComponent, canActivate: [AuthGuard] },
  { path: 'assessment-edit/:id', component: AssessmentEditComponent, canActivate: [AuthGuard] },
  { path: 'student-edit/:id', component: StudentEditComponent },  
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] }, 
  { path: 'courses-list', component: CoursesListComponent, canActivate: [AuthGuard] },
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard] },
  { path: 'professors', component: ProfessorsComponent, canActivate: [AuthGuard] },
  { path: 'professors-list', component: ProfessorsListComponent, canActivate: [AuthGuard] },
  { path: 'professor-edit/:id', component: EditProfessorComponent, canActivate: [AuthGuard] },
  { path: 'enrollments', component: EnrollmentsComponent, canActivate: [AuthGuard] }, 
  { path: 'enrollments-list', component: EnrollmentsListComponent, canActivate: [AuthGuard] },
  { path: 'enrollment-edit/:id', component: EditEnrollmentComponent, canActivate: [AuthGuard] },
  { path: 'grades', component: GradesComponent, canActivate: [AuthGuard] }, 
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthGuard] }, 
  { path: 'departments-list', component: DepartmentsListComponent, canActivate: [AuthGuard] },
  { path: 'departments-edit/:id', component: DepartmentsEditComponent, canActivate: [AuthGuard] },
  { path: 'schedules-list', component: SchedulesListComponent, canActivate: [AuthGuard] },
  { path: 'schedules-edit/:id', component: SchedulesEditComponent, canActivate: [AuthGuard] },
  { path: 'grades-list', component: GradesListComponent, canActivate: [AuthGuard] },
  { path: 'grades-edit/:id', component: GradesEditComponent, canActivate: [AuthGuard] },
  { path: 'course-prerequisites/:id', component: CoursesPrerequisitesComponent },
  { path: '**', redirectTo: '/login' }, 
  
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}