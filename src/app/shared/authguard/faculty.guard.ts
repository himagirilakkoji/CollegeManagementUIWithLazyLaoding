import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})

export class FacultyGuard implements CanActivate {

  isNavigation: boolean = false;
  constructor(private _service: ServicesService, private _store: Store<{ data: { data: string } }>) {
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let RoleName = localStorage.getItem('RoleName');
      if(RoleName?.toLocaleLowerCase() === "faculty"){
        this.isNavigation = true;
      }
      return this.isNavigation;
  }
  
}
