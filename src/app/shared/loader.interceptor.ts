import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private spinnerservice : SpinnerService) {}

  intercept(request: import('@angular/common/http').HttpRequest<any>, next: import('@angular/common/http').HttpHandler): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    this.spinnerservice.show();
    return next.handle(request).pipe(finalize(()=>this.spinnerservice.hide()));
  }

}
