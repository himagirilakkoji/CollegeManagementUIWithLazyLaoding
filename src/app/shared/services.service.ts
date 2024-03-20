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
    return this.http.post<any>(apiUrl, data);
  }

  postFaculty(data: any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.postFacultyUrl;
    return this.http.post<any>(apiUrl, data);
  }

  getDepartmentdata(): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getDepartmentDetailsUrl;
    return this.http.get<any>(apiUrl);
  }

  getFacultyListdata(): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getFacultyListUrl;
    return this.http.get<any>(apiUrl);
  }

  getFacultyListdataByPagination(pageNumber:number,pageSize:number): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getFacultyWithPaginationListUrl;
    return this.http.get<any>(`${apiUrl}/${pageNumber}/${pageSize}`);
  }

  deleteFacultyById(userid:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.deleteFacultyByIdUrl;
    return this.http.delete<any>(`${apiUrl}/${userid}`);
  }

  updateFacultyById(userid:any,data:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.updateFacultyByIdUrl;
    return this.http.put<any>(`${apiUrl}/${userid}`, data);
  }

  postStudent(data: any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.postStudentUrl;
    return this.http.post<any>(apiUrl, data);
  }

  getStudentListdata(): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getAllStudentUrl;
    return this.http.get<any>(apiUrl);
  }

  deleteStudentById(userid:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.deleteStudentByIdUrl;
    return this.http.delete<any>(`${apiUrl}/${userid}`);
  }
  
  postStudentExamMarks(data: any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.postStudentExamMarksUrl;
    return this.http.post<any>(apiUrl, data);
  }
  
  getCourseLevelReportById(userid:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getCourseLevelReportByIdUrl;
    return this.http.get<any>(`${apiUrl}/${userid}`);
  }

  getSubjectLevelReportById(userid:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getSubjectLevelReportByIdUrl;
    return this.http.get<any>(`${apiUrl}/${userid}`);
  }

  updateStudentById(userid:any,data:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.updateStudentByIdUrl;
    return this.http.put<any>(`${apiUrl}/${userid}`, data);
  }

  getStudentMarksById(userid:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getStudentMarksByIdUrl;
    return this.http.get<any>(`${apiUrl}/${userid}`);
  }

  getAutoSearchStudentNamesByText(text:any): Observable<any> {
    const apiUrl = environment.apiUrl+environment.getAutoSearchStudentNamesByText;
    return this.http.get<any>(`${apiUrl}/${text}`);
  }
  
}
