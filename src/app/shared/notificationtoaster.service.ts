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
    
    this._store.select('data').subscribe((res:any) => {
      if (res.data.toLowerCase() == "admin") {
          toastrRef.onHidden.subscribe(() => {
             this.router.navigateByUrl('/adminDashboard');
           });
      }
      if (res.data.toLowerCase() == "faculty") {
          toastrRef.onHidden.subscribe(() => {
             this.router.navigateByUrl('/facultyDashboard');
          });
      }
      if (res.data.toLowerCase() == "student") {
          toastrRef.onHidden.subscribe(() => {
             this.router.navigateByUrl('/studentDashboard');
          });
      }
    });
    

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
