import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../shared/services.service';
import { Login } from '../models/login';
import { SpinnerService } from '../shared/spinner.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAdminAction, loginFacultyAction, loginStudentAction } from '../loginAction';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginobj = new Login();

  constructor(private formBuilder: FormBuilder, private service: ServicesService, private spinnerservice: SpinnerService, private router: Router, private _store: Store<{ data: { data: string } }>,
  ) {

  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [Validators.required,]),
      password: new FormControl("", [Validators.required])
    });

  }

  navigateToDashBoard() {
    this.loginobj.emailid = this.loginForm.get('email')?.value;
    this.loginobj.password = this.loginForm.get('password')?.value;
    this.service.postAdmin(this.loginobj).subscribe(res => {
      if (res != null && res.adminDetails.roleName == "Admin") {
        console.log("login", res.adminDetails.roleName);
        this._store.dispatch(loginAdminAction());
        alert("User Login Sucess");
        this.router.navigateByUrl('/adminDashboard');
      }
    })
  }
}
