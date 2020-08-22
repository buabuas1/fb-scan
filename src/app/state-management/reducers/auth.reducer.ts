import {AppStates} from '../app-state';
import {createSelector} from 'reselect';
import {AuthAction, AuthActionTypes} from '../actions/auth.action';

export interface AuthState {
    user: any;
}

const initialState: AuthState = {
    user: {}
};

export function AuthReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.FB_AUTH_ADD:
            return {...state, user: action.payload};
        case AuthActionTypes.FB_AUTH_REMOVE:
            return {...state, user: {}};
        default:
            return state;
    }
}

export const getAuthState = (state: AppStates) => state.fbAuthSate;
export const getAuthToken = createSelector(getAuthState, stateAu => stateAu.tokens);
