import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let userService = this.injector.get(UserService);
    let jwtToken = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + userService.getToken()
      }
    });
  return next.handle(jwtToken);
  }
}
