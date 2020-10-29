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
        case AuthActionTypes.AUTH_ADD:
            return {...state, user: action.payload};
        case AuthActionTypes.AUTH_REMOVE:
            return {...state, user: {}};
        default:
            return state;
    }
}

export const getAuthState = (state: AppStates) => state.authState;
export const getAuthUser = createSelector(getAuthState, authState => authState.user);
