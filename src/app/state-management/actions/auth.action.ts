import { Action } from '@ngrx/store';
import { type } from 'app/common/util';

export const AuthActionTypes = {
    AUTH_ADD: type('[Auth] set Auth '),
    AUTH_REMOVE: type('[Auth] remove Auth'),
};

export class AuthActionAddAction implements Action {
    readonly type = AuthActionTypes.AUTH_ADD;
    constructor(public payload: any) { }
}

export class AuthActionRemoveAction implements Action {
    readonly type = AuthActionTypes.AUTH_REMOVE;
    constructor(public payload: any) { }
}


export type AuthAction =
    AuthActionAddAction |
    AuthActionRemoveAction;


