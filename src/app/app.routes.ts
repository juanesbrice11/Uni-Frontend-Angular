import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Auth
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

// Students
import { StudentsComponent } from './modules/students/students.component';
import { StudentsListComponent } from './modules/students/students-list.component';
import { StudentEditComponent } from './modules/students/students-edit.component';

// Professors
import { ProfessorsComponent } from './modules/professors/professors.component';
import { ProfessorsListComponent } from './modules/professors/professors-list.component';
import { EditProfessorComponent } from './modules/professors/professors-edit.component';

// Courses
import { CoursesComponent } from './modules/courses/courses.component';
import { CoursesListComponent } from './modules/courses/courses-list.component';
import { CourseEditComponent } from './modules/courses/course-edit.component';
import { CoursesPrerequisitesComponent } from './modules/courses/course-prerequisites.component';

// Departments
import { DepartmentsComponent } from './modules/departments/departments.component';
import { DepartmentsListComponent } from './modules/departments/departments-list.component';
import { DepartmentsEditComponent } from './modules/departments/departments-edit.component';

// Enrollments
import { EnrollmentsComponent } from './modules/enrollments/enrollments.component';
import { EnrollmentsListComponent } from './modules/enrollments/enrollments-list.component';
import { EditEnrollmentComponent } from './modules/enrollments/enrollments-edit.component';

// Assessments
import { AssessmentsComponent } from './modules/assessments/assessments.component';
import { AssessmentsListComponent } from './modules/assessments/assessments-list.component';
import { AssessmentEditComponent } from './modules/assessments/assessment-edit.component';

// Schedules
import { SchedulesComponent } from './modules/schedules/schedules.component';
import { SchedulesListComponent } from './modules/schedules/schedules-list.component';
import { SchedulesEditComponent } from './modules/schedules/schedules-edit.component';

// Grades
import { GradesComponent } from './modules/grades/grades.component';
import { GradesListComponent } from './modules/grades/grades-list.component';
import { GradesEditComponent } from './modules/grades/grades-edit.component';

export const routes: Routes = [
  // Auth Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },

  // Students Routes
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'students-list', component: StudentsListComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'student-edit/:id', component: StudentEditComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },

  // Professors Routes
  { path: 'professors', component: ProfessorsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'professors-list', component: ProfessorsListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'professor-edit/:id', component: EditProfessorComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },

  // Courses Routes
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'courses-list', component: CoursesListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'course-edit/:id', component: CourseEditComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'course-prerequisites/:id', component: CoursesPrerequisitesComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },

  // Departments Routes
  { path: 'departments', component: DepartmentsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'departments-list', component: DepartmentsListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'departments-edit/:id', component: DepartmentsEditComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },

  // Enrollments Routes
  { path: 'enrollments', component: EnrollmentsComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'enrollments-list', component: EnrollmentsListComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  { path: 'enrollment-edit/:id', component: EditEnrollmentComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },

  // Assessments Routes
  { path: 'assessments', component: AssessmentsComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'assessments-list', component: AssessmentsListComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'assessment-edit/:id', component: AssessmentEditComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },

  // Schedules Routes
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'schedules-list', component: SchedulesListComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'schedules-edit/:id', component: SchedulesEditComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },

  // Grades Routes
  { path: 'grades', component: GradesComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'grades-list', component: GradesListComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },
  { path: 'grades-edit/:id', component: GradesEditComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'professor'] } },

  // Wildcard Route
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
