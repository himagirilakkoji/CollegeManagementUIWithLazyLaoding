import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationtoasterService {

  constructor(private toastr: ToastrService, private router: Router, private _store: Store<{ data: { data: string } }>) { }

  loginSuccess(message: string){
    const toastrRef = this.toastr.success(message, undefined, { positionClass: 'toast-top-right' });
    let RoleName = localStorage.getItem('RoleName');
    
    if(RoleName?.toLocaleLowerCase() === "admin"){
      toastrRef.onHidden.subscribe(() => {
        this.router.navigateByUrl('/adminDashboard');
      });
    }

    if(RoleName?.toLocaleLowerCase() === "faculty"){
      toastrRef.onHidden.subscribe(() => {
        this.router.navigateByUrl('/facultyDashboard');
      });
    }

    if(RoleName?.toLocaleLowerCase() === "student"){
      toastrRef.onHidden.subscribe(() => {
        this.router.navigateByUrl('/studentDashboard');
      });
    
    }


    

  }

  navigationToUrl(){

  }




  Success(message: string){
    const toastrRef = this.toastr.success(message, undefined, { positionClass: 'toast-top-right' });
  }

  Error(message: string, activeTick?: boolean){
      this.toastr.error(message, undefined, {onActivateTick: activeTick, positionClass: 'toast-top-right',disableTimeOut:false});
  }

  Clear() {
    this.toastr.clear();
  }

}
