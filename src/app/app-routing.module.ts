import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogincontentComponent } from './logincontent/logincontent.component';
import { LoginGuard } from './shared/authguard/login.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  { path: "", component: LogincontentComponent },
  { path: "adminDashboard", loadChildren: () => import('../app/admin/admin.module').then(m => m.AdminModule),canActivate: [LoginGuard]},
  { path: "facultyDashboard", loadChildren: () => import('../app/faculty/faculty.module').then(f => f.FacultyModule),canActivate: [LoginGuard]},
  { path: "studentDashboard", loadChildren: () => import('../app/student/student.module').then(s => s.StudentModule),canActivate: [LoginGuard]},
  { path: 'notFound', component: PageNotFoundComponent },
  { path: '**',redirectTo:"notFound" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
