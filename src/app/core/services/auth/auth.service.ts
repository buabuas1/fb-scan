import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {SessionSettingsService} from '../settings';
import {UserData} from '@models/auth';
import {Store} from "@ngrx/store";
import {AppStates} from "../../../state-management/app-state";
import {AuthActionAddAction, AuthActionRemoveAction} from "../../../state-management/actions/auth.action";

@Injectable()
export class AuthService {

    constructor(private session: SessionSettingsService,
                private store: Store<AppStates>) {
    }

    public isAuthenticated(): boolean {
        return this.session.isTokenExpired();
    }

    public isSuperAdmin(): boolean {
        const user = this.session.getCurrentData();
        return !!user && this.isAuthenticated() && user.name === 'sonnv';
    }

    public login(name: string, password: string): Observable<UserData> {
        const user = new UserData(name, 'admin');
        this.session.createNewSession(user);
        this.store.dispatch(new AuthActionAddAction(user));
        return Observable.of(user);
    }

    public logout(): Observable<void> {
        this.session.removeSession();
        this.store.dispatch(new AuthActionRemoveAction({}));
        return Observable.of();
    }
}
