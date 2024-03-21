import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../shared/services.service';
import { Login } from '../models/login';
import { SpinnerService } from '../shared/spinner.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAdminAction, loginFacultyAction, loginStudentAction } from '../loginAction';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { NotificationtoasterService } from '../shared/notificationtoaster.service';
import { FieldValidationPattern } from '../shared/validationpatterns/FieldValidationPattern';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginobj = new Login();

  constructor(private formBuilder: FormBuilder, private service: ServicesService, private spinnerservice: SpinnerService, private router: Router, private _store: Store<{ data: { data: string } }>,
    private toastr: NotificationtoasterService) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required,Validators.pattern(FieldValidationPattern.EmailValidationPattern)]),
      password: new FormControl("", [Validators.required])
    });

  }

  navigateToDashBoard() {
    this.loginobj.emailid = this.loginForm.get('email')?.value;
    this.loginobj.password = this.loginForm.get('password')?.value;
    localStorage.removeItem('RoleName');
    this.service.postAdmin(this.loginobj).subscribe(res => {
    localStorage.setItem('RoleName',res.adminDetails.roleName );
    if(res.adminDetails.roleName !=null){
      this.toastr.loginSuccess('User Login Sucess');
    }
    else{
      this.toastr.Error('Invalid User');
    }
    },
    (error) => {
      if (error.status === 401) {
        this.toastr.Error("Unauthorized");
      } else if (error.status === 404) {
        this.toastr.Error("Not Found");
      } else if (error.status === 500) {
        this.toastr.Error("Internal Server Error");
      } else {
        this.toastr.Error("An error occurred");
      }
    }
    
    )
  }
}
