import {FilterActions, FilterActionTypes} from '../actions/filter.action';
import {AppStates} from '../app-state';
import {createSelector} from 'reselect';

export interface FilterState {
    page: any;
    isShowRevenue: boolean;
    checkinFilter: any;
    isShowSpinner: boolean
}

const initialState: FilterState = {
    page: '',
    isShowRevenue: false,
    checkinFilter: {
        PackageId: ''
    },
    isShowSpinner: false
};

export function FilterReducer(state = initialState, action: FilterActions): FilterState {
    switch (action.type) {
        case FilterActionTypes.UI_SHOW_REVENUE:
            return {...state, isShowRevenue: action.payload};
            case FilterActionTypes.SET_REVENUE_FILTER:
                let cur = JSON.parse(JSON.stringify(state));
                cur.checkinFilter = action.payload;
            return cur;
        case FilterActionTypes.SET_SHOW_SPINNER:
            return {
                ...state, isShowSpinner: action.payload
            };
        default:
            return state;
    }
}

export const getFilterState = (state: AppStates) => state.filterState;
export const getFilterShowRevenue = createSelector(getFilterState, state => state.isShowRevenue);
export const getFilterRevenue = createSelector(getFilterState, state => state.checkinFilter);
export const getIsShowSpinner = createSelector(getFilterState, state => state.isShowSpinner);
