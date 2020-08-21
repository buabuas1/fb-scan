import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '@shared/page-not-found';
import {HeaderComponent} from '../header';
import {AuthGuard} from '@core/services/auth/auth.guard';
import {TermComponent} from './term.component';

const mainRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: TermComponent,
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
export class TermModuleRouting {
}
