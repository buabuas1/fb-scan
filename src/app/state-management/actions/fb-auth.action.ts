import { Action } from '@ngrx/store';
import { type } from 'app/common/util';

export const FbAuthActionTypes = {
    FB_AUTH_ADD: type('[FbAuth] set FbAuth '),
    FB_AUTH_REMOVE: type('[FbAuth] remove FbAuth'),
};

export class FbAuthActionAddAction implements Action {
    readonly type = FbAuthActionTypes.FB_AUTH_ADD;
    constructor(public payload: any) { }
}

export class FbAuthActionRemoveAction implements Action {
    readonly type = FbAuthActionTypes.FB_AUTH_REMOVE;
    constructor(public payload: any) { }
}
export type FbAuthActions =
    FbAuthActionAddAction |
    FbAuthActionRemoveAction;


