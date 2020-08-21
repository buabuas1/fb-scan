import { Action } from '@ngrx/store';
import { type } from 'app/common/util';

export const FilterActionTypes = {
    UI_SHOW_REVENUE: type('[Filter] set show/hide filter revenue'),
    SET_REVENUE_FILTER: type('[Filter] set filter revenue'),
};

export class ToggleShowRevenueAction implements Action {
    readonly type = FilterActionTypes.UI_SHOW_REVENUE;
    constructor(public payload: any) { }
}

export class SetCheckinFilterAction implements Action {
    readonly type = FilterActionTypes.SET_REVENUE_FILTER;
    constructor(public payload: any) { }
}
export type FilterActions =
    ToggleShowRevenueAction |
    SetCheckinFilterAction;


