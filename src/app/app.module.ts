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
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import '@progress/kendo-ui';
import {BsModalService} from 'ngx-bootstrap';
import {reducers} from './state-management/app-state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {ToastrModule } from 'ng6-toastr-notifications';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyHttpInterceptor} from './common/http/httpinterceptor';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {PrintService} from '@core/services/print/print.service';
import {PrintTemplateService} from '@core/services/print/print-template.service';

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
        ToastrModule.forRoot(),
        HttpClientModule,
        ChartsModule
    ],
    providers: [
        BsModalService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MyHttpInterceptor,
            multi: true
        },
        LoggerServiceService,
        PrintService,
        PrintTemplateService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
