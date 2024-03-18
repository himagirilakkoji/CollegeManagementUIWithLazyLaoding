import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServicesService } from './services.service';
import { SpinnerService } from './spinner.service';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptor } from './loader.interceptor';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { FacultylistComponent } from './facultylist/facultylist.component';
import { LoginGuard } from './authguard/login.guard';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StudentregisterComponent } from './studentregister/studentregister.component';
import { ExamreportComponent } from './examreport/examreport.component';
import { AddstudentmarksComponent } from './addstudentmarks/addstudentmarks.component';
import { ExamstudentlevelreportComponent } from './examstudentlevelreport/examstudentlevelreport.component';
import { ToastrModule } from 'ngx-toastr';
import { NotificationtoasterService } from './notificationtoaster.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { StudentRegistrationComponent } from './studentreg/studentregistration.component';
import { StudentmarksreportComponent } from './studentmarksreport/studentmarksreport.component';



@NgModule({
  declarations: [
    RegisterComponent,
    LoaderComponent,
    TopbarComponent,
    SidebarComponent,
    StudentlistComponent,
    FacultylistComponent,
    StudentregisterComponent,
    ExamreportComponent,
    AddstudentmarksComponent,
    ExamstudentlevelreportComponent,
    StudentRegistrationComponent,
    StudentmarksreportComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        preventDuplicates: true
      }
    ),
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  exports: [RegisterComponent,LoaderComponent,TopbarComponent,SidebarComponent,FormsModule,
    ReactiveFormsModule ,StudentlistComponent,StudentRegistrationComponent,StudentmarksreportComponent,
    FacultylistComponent,StudentregisterComponent,ExamreportComponent,AddstudentmarksComponent,ExamstudentlevelreportComponent],
  providers: [LoginGuard,ServicesService,SpinnerService,NotificationtoasterService,{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
                                             {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi:true}]
})
export class SharedModule { }
