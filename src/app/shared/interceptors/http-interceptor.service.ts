import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const loginToken = this.authService.getToken();
    req = req.clone({
        setHeaders: {
            Authorization: "Bearer " + loginToken
        }
    });
    return next.handle(req);
}
}
