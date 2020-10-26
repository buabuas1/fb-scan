import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '@shared/page-not-found';
import {HeaderComponent} from '../header';
import {SuperAdminGuard} from '@core/services/auth';
import {CustomerListComponent} from './customer-list/customer-list.component';

const mainRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [SuperAdminGuard],
        canActivateChild: [SuperAdminGuard],
        component: CustomerListComponent,
        outlet: 'body'
    },
    {
        path: '',
        component: HeaderComponent,
        outlet: 'header'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(mainRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CustomerModuleRouting {
}
