import { ActionReducer, combineReducers, ActionReducerMap } from '@ngrx/store';
import {FilterReducer, FilterState} from './reducers/filter.reducer';


export interface AppStates {
    // router: fromRouter.RouterReducerState;
    // session: SessionState;
    // cartList: CartListState;
    // kitchen: KitchenState;
    // appSettings: AppSettingState;
    // tableFilter: TableFilterState;
    // productFilter: ProductFilterState;
    filterState: FilterState;
    // notification: NotificationState;
    // reservation: ReservationState;
    // importExport: ImportExportState;
}

export const reducers: ActionReducerMap<AppStates> = {
    // router: fromRouter.routerReducer ,
    // session: sessionReducer,
    // cartList: cartListReducer,
    // kitchen: kitchenReducer,
    // appSettings: appSettingsReducer,
    // tableFilter: tableFilterReducer,
    // productFilter: productFilterReducer,
    filterState: FilterReducer,
    // notification: notificationReducer,
    // reservation: reservationReducer,
    // importExport: importExportReducer
};

const rootReducer: ActionReducer<AppStates> = combineReducers(reducers);

// Single reducer funciton
export function reducer(state: any, action: any) {
    return rootReducer(state, action);
}

// export const getRouteState = (state: AppStates) => state.router;

