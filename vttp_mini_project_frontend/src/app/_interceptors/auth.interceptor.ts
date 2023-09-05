import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authService: AuthService = inject(AuthService)

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getAccessToken()
    const authReq = request.clone({ setHeaders: { Authorization: "Bearer " + accessToken } });

    console.log(">> AuthInterceptor: httprequest intercepted, added token to header")

    return next.handle(authReq);
  }
}
