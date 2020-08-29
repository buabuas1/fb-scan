import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SessionSettingsService} from '../settings';
import {UserData} from '@models/auth';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';
import {AuthActionAddAction, AuthActionRemoveAction} from '../../../state-management/actions/auth.action';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AuthService {
    private host = environment.beHost;
    constructor(private session: SessionSettingsService,
                private store: Store<AppStates>,
                private httpClient: HttpClient
                ) {
    }

    public isAuthenticated(): boolean {
        return this.session.isTokenExpired();
    }

    public isSuperAdmin(): boolean {
        const user = this.session.getCurrentData();
        return !!user && this.isAuthenticated() && user.name === 'sonnv';
    }

    public login(name: string, password: string): Observable<any> {
        // const user = new UserData(name, 'admin');
        // this.session.createNewSession(user);
        // // this.store.dispatch(new AuthActionAddAction(user));
        // return Observable.of(user);
        return new Observable(obs => {
            this.httpClient.post(this.host + 'api/auth/login', {
                'email': name,
                'password': password
            })
                .take(1)
                .subscribe((rs: any) => {
                    this.session.createNewSession(rs.user, rs.token);
                    obs.next(rs.user);
                });
        });
    }

    public logout(): Observable<void> {
        this.session.removeSession();
        this.store.dispatch(new AuthActionRemoveAction({}));
        return Observable.of();
    }
}
