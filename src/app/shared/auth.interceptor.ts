import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // console.log('Request headers before cloning:', request.headers.keys());
    // console.log('Request headers value before cloning:', headers.toString());
    // Clone the request and add the headers
    const authRequest = request.clone({
      headers: headers
    });
    // console.log('Request headers after cloning:', authRequest.headers.keys());
    // console.log('Request headers value after cloning:', authRequest.headers.get('Content-Type'));
    return next.handle(authRequest);
  }
}
