import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

// Interceptor (noun) > a person or thing that stops or catches
// (someone or something) going from one place to another.

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    console.log('AuthInterceptor authToken: ' + authToken);
    const authRequest = req.clone({
      // set is not overwrite unless req already has "headers"
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    // normally if we do nothing just return req to "next.handle(req)"
    return next.handle(authRequest);
  }
}
