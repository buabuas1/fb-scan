import { Action } from '@ngrx/store';
import { type } from 'app/common/util';

export const AuthActionTypes = {
    FB_AUTH_ADD: type('[Auth] set Auth '),
    FB_AUTH_REMOVE: type('[Auth] remove Auth'),
};

export class AuthActionAddAction implements Action {
    readonly type = AuthActionTypes.FB_AUTH_ADD;
    constructor(public payload: any) { }
}

export class AuthActionRemoveAction implements Action {
    readonly type = AuthActionTypes.FB_AUTH_REMOVE;
    constructor(public payload: any) { }
}


export type AuthAction =
    AuthActionAddAction |
    AuthActionRemoveAction;


