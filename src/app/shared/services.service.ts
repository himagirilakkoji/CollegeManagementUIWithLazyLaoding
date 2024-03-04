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

  getFacultydata(): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getDepartmentDetailsUrl;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(apiUrl);
  }

}
