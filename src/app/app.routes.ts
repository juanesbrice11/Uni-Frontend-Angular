import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './modules/students/students.component';


export const routes: Routes = [
  { path: 'students', component: StudentsComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule {}