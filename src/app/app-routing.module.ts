import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincontentComponent } from './logincontent/logincontent.component';
import { LoginGuard } from './shared/authguard/login.guard';

const routes: Routes = [
  { path: "", component: LogincontentComponent },
  { path: "adminDashboard", loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule),canActivate: [LoginGuard] },
  { path: "facultyDashboard", loadChildren: () => import('../app/faculty/faculty.module').then(m => m.FacultyModule),canActivate: [LoginGuard] },
  { path: "studentDashboard", loadChildren: () => import('../app/student/student.module').then(m => m.StudentModule) ,canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
