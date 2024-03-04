import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  // loginRoleType:string ="";
  // private _roleType = new BehaviorSubject<string>(this.loginRoleType);
  // _roleType$ = this._roleType.asObservable();

  constructor(private http: HttpClient) {

  }

  // getRoleData():Observable<string>{
  //   return this._roleType$;
  // }

  // setRoleData(role :string){
  //   this._roleType.next(this.loginRoleType = role);
  // }

  postAdmin(data: any): Observable<any> {
    const apiUrl = "https://localhost:7286/Api/Admin/LoginValidation";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl, data, { headers });
  }

  getFacultydata(): Observable<any> {
    const apiUrl = "https://localhost:7286/Api/Admin/LoginValidation";
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>("");
  }

}
