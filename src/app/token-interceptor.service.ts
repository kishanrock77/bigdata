import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
if(localStorage.getItem('unique_id')==null){
  var un="Session Out";
     }else{
     var un=localStorage.getItem('unique_id');
     }
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  
  intercept(    request: HttpRequest<any>,    next: HttpHandler  ): Observable<HttpEvent<any>> {
   // add a custom header
  

   const customReq = request.clone({
    headers: request.headers.set('unique_id',  un  )
  });

  // pass on the modified request object
  return next.handle(customReq);
  }
}