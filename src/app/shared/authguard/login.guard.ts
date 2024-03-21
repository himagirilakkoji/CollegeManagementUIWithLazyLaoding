import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  isNavigation: boolean = false;
  constructor(private _service: ServicesService,private route:Router, private _store: Store<{ data: { data: string } }>) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
    let RoleName = localStorage.getItem('RoleName');
    let requestedUrl = state.url.split('/')[1]; // Extract the first part of the URL
    if (RoleName?.toLowerCase() === "admin" && requestedUrl === 'adminDashboard') {
      return true;
    } else if (RoleName?.toLowerCase() === "faculty" && requestedUrl === 'facultyDashboard') {
      return true;
    } else if (RoleName?.toLowerCase() === "student" && requestedUrl === 'studentDashboard') {
      return true;
    } else {
      return this.route.navigateByUrl('notFound'); // Redirect to PageNotFoundComponent
    }
  }
}
