import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  RoleType: string = "";
  isNavigation: boolean = false;
  constructor(private _service: ServicesService, private _store: Store<{ data: { data: string } }>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this._store.select('data').subscribe(res => {
      this.RoleType = res.data;
      console.log("login auth" , this.RoleType);
      if (this.RoleType == "Admin") {
        return this.isNavigation = true;
      }
      if (this.RoleType == "Faculty") {
        return this.isNavigation = true;
      }
      if (this.RoleType == "Student") {
        return this.isNavigation = true;
      }
      return this.isNavigation = false;
    })
    return this.isNavigation = true;
  }
}
