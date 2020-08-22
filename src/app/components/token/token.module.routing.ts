import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '@shared/page-not-found';
import {HeaderComponent} from '../header';
import {AuthGuard} from '@core/services/auth/auth.guard';
import {TokenComponent} from './token.component';
import {SuperAdminGuard} from "@core/services/auth/super-admin.guard";

const mainRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [SuperAdminGuard],
        canActivateChild: [SuperAdminGuard],
        component: TokenComponent,
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
export class TokenModuleRouting {
}
