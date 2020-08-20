import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './components/auth';
import {HeaderModule} from './components/header';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.module.routing';
import {DashboardModule} from './components/dashboard';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GridModule} from '@progress/kendo-angular-grid';
import '@progress/kendo-ui';
import {BsModalService} from 'ngx-bootstrap';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuthModule,
        HeaderModule,
        DashboardModule,
        AppRoutingModule,
        GridModule,
        SharedModule.forRoot(),
        CoreModule,
        BrowserAnimationsModule
    ],
    providers: [BsModalService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
