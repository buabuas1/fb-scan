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
import {reducers} from './state-management/app-state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {ToastModule, ToastOptions} from 'ng2-toastr';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './common/http/httpinterceptor';
export class CustomOption extends ToastOptions {
    animate = 'flyRight'; // you can override any options available
    newestOnTop = false;
    showCloseButton = true;
    positionClass = 'toast-bottom-right';
}
@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AuthModule,
        HeaderModule,
        DashboardModule,
        AppRoutingModule,
        GridModule,
        StoreModule.forRoot(reducers, {
            // metaReducers
        }),
        SharedModule.forRoot(),
        CoreModule,
        BrowserAnimationsModule,
        true ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
        ToastModule.forRoot(),
        HttpClientModule,
    ],
    providers: [
        BsModalService,
        {provide: ToastOptions, useClass: CustomOption},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
