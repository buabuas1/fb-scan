import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';
import {AuthService} from '@core/services/auth/auth.service';

@Injectable()
export class SuperAdminGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isSuperAdmin();
    }
}
