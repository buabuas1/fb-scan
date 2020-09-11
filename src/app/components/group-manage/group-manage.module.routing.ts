import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@core/services/auth/auth.guard';
import {HeaderComponent} from '../header';
import {PageNotFoundComponent} from '@shared/page-not-found';
import {GroupManageComponent} from './group-manage/group-manage.component';


const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: GroupManageComponent,
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
export class GroupManageModuleRouting {
}
