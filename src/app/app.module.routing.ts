import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header';
import {AuthGuard} from '@core/services/auth/auth.guard';

const mainRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: '',
                component: AppComponent,
            },
            {
                path: '',
                component: HeaderComponent,
                outlet: 'header'
            },
        ]
    },
    {
        path: 'invoice',
        loadChildren: 'app/components/invoice/invoice.module#InvoiceModule'
    },
    {
        path: 'fb',
        loadChildren: 'app/components/fb-chart/fb-comment.module#FbCommentModule'
    },
    {
        path: 'token',
        loadChildren: 'app/components/token/token.module#TokenModule'
    },
    {
        path: 'term',
        loadChildren: 'app/components/term/term.module#TermModule'
    },
    {
        path: 'policy',
        loadChildren: 'app/components/policy/policy.module#PolicyModule'
    },
    {
        path: 'group',
        loadChildren: 'app/components/group-manage/group-manage.module#GroupManageModule'
    },
    {
        path: 'room',
        loadChildren: 'app/components/room/room.module#RoomModule'
    },
    {
        path: 'product',
        loadChildren: 'app/components/product/product.module#ProductModule'
    },
    {
        path: 'customer',
        loadChildren: 'app/components/customer/customer.module#CustomerModule'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(mainRoutes, {
            useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
