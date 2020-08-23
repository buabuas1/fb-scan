import { Action } from '@ngrx/store';
import { type } from 'app/common/util';

export const FbAuthActionTypes = {
    FB_AUTH_ADD: type('[FbAuth] set FbAuth '),
    FB_AUTH_ADD_LIST: type('[FbAuth] set FbAuth list token'),
    FB_AUTH_REMOVE: type('[FbAuth] remove FbAuth'),
    FB_AUTH_UPDATE: type('[FbAuth] update FbAuth'),
};

export class FbAuthActionAddAction implements Action {
    readonly type = FbAuthActionTypes.FB_AUTH_ADD;
    constructor(public payload: any) { }
}

export class FbAuthActionRemoveAction implements Action {
    readonly type = FbAuthActionTypes.FB_AUTH_REMOVE;
    constructor(public payload: any) { }
}

export class FbAutSetListTokenAction implements Action {
    readonly type = FbAuthActionTypes.FB_AUTH_ADD_LIST;
    constructor(public payload: any) { }
}

export class FbAuthUpdateTokenAction implements Action {
    readonly type = FbAuthActionTypes.FB_AUTH_UPDATE;
    constructor(public payload: any) { }
}
export type FbAuthActions =
    FbAuthActionAddAction |
    FbAutSetListTokenAction |
    FbAuthUpdateTokenAction |
    FbAuthActionRemoveAction;


