import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('jwt');

        console.log('token found in interceptor: ' + token);

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('x-auth-token', token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}