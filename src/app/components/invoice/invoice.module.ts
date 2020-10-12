import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {InvoiceModuleRouting} from './invoice.module.routing';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';
import {PrintService} from '@core/services/print/print.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        InvoiceModuleRouting,
        HeaderModule,
    ],
    providers: [
        PrintService
    ],
    declarations: [InvoiceComponent]
})
export class InvoiceModule {
}
