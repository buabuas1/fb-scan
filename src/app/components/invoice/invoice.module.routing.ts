import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from '../auth';
import {PageNotFoundComponent} from '@shared/page-not-found';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../header';
import {AuthGuard} from '@core/services/auth/auth.guard';
import {InvoiceComponent} from './invoice.component';
import {SuperAdminGuard} from '@core/services/auth';

const mainRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [SuperAdminGuard],
        canActivateChild: [SuperAdminGuard],
        component: InvoiceComponent,
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
export class InvoiceModuleRouting {
}
