import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) {

  }

  postAdmin(data: any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.postLoginValidationUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl, data, { headers });
  }

  postFaculty(data: any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.postFacultyUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl, data, { headers });
  }

  getDepartmentdata(): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getDepartmentDetailsUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(apiUrl);
  }

  getFacultyListdata(): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getFacultyListUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(apiUrl);
  }

  deleteFacultyById(userid:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.deleteFacultyByIdUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(`${apiUrl}/${userid}`);
  }

  updateFacultyById(userid:any,data:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.updateFacultyByIdUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${apiUrl}/${userid}`, data, { headers });
  }

}
