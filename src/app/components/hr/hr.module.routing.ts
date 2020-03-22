import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth';
import { PageNotFoundComponent } from '@shared/page-not-found';
import { AppComponent } from '../../app.component';
import { HeaderComponent } from '../header';
import { AuthGuard } from '@core/services/auth/auth.guard';
import {HrComponent} from './hr.component';

const mainRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: HrComponent
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
export class HrModuleRouting { }
