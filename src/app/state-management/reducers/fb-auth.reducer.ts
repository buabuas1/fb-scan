import {AppStates} from '../app-state';
import {createSelector} from 'reselect';
import {FbAuthActions, FbAuthActionTypes} from '../actions/fb-auth.action';
import {TokenModel} from '@models/facebook/token.model';
import * as R from 'ramda';

export interface FbAuthState {
    tokens: Array<TokenModel>;
}

const initialState: FbAuthState = {
    tokens: []
};

export function FbAuthReducer(state = initialState, action: FbAuthActions): FbAuthState {
    switch (action.type) {
        case FbAuthActionTypes.FB_AUTH_ADD:
            return {...state, tokens: [...state.tokens, action.payload]};
        case FbAuthActionTypes.FB_AUTH_REMOVE:
            return {...state, tokens: state.tokens.filter(t => t.userID !== (action.payload as TokenModel).userID)};
        case FbAuthActionTypes.FB_AUTH_ADD_LIST:
            return {...state, tokens: R.clone(action.payload)};
        default:
            return state;
    }
}

export const getFbAuthState = (state: AppStates) => state.fbAuthSate;
export const getFbAuthToken = createSelector(getFbAuthState, stateAu => stateAu.tokens);
