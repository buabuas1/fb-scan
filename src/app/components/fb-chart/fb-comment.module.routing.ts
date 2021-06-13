import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@core/services/auth/auth.guard';
import {FbCommentComponent} from './fb-chart/fb-comment.component';
import {HeaderComponent} from '../header';
import {PageNotFoundComponent} from '@shared/page-not-found';


const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: FbCommentComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
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
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FbCommentModuleRouting {
}
