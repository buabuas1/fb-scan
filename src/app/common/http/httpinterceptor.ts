import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {SessionSettingsService} from '@core/services/settings';
import {AuthService} from '@core/services/auth';
import {Router} from '@angular/router';
import {RouteConfigs} from '../../configs/route.configs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(private sessionSettingsService: SessionSettingsService,
                private authService: AuthService,
                private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // console.log('intercepted request ... ');

        // Clone the request to add the new header.
        let token = '';
        if (this.authService.isAuthenticated()) {
            token = this.sessionSettingsService.getToken();
        }
        const authReq = token ?
            req.clone(
            {
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            }) : req.clone({});

        console.log('Sending request with new header now ...');

        // send the newly created request
        return next.handle(authReq)
            .catch((error, caught) => {
                // intercept the respons error and displace it to the console
                console.log('Error Occurred');
                console.log(error);
                if (error.status === 401) {
                    this.router.navigate([RouteConfigs.loginRoute]);
                }
                // return the error to the method that called it
                return Observable.throw(error);
            }) as any;
    }
}
