import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {InvoiceModuleRouting} from './invoice.module.routing';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';
import {PrintService} from '@core/services/print/print.service';
import {ProductService} from '@core/services/product/product.service';
import {RoomService} from '@core/services/room/room.service';
import { InvoiceFormComponent } from './component/invoice-form/invoice-form.component';
import {ModalService} from '@core/services/modal/modal.service';
import {FormsModule} from '@angular/forms';
import {IntlModule} from '@progress/kendo-angular-intl';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {CustomerService} from '@core/services/customer/customer.service';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        InvoiceModuleRouting,
        HeaderModule,
        FormsModule,
        IntlModule,
        DropDownListModule,
    ],
    providers: [
        PrintService,
        ProductService,
        RoomService,
        ModalService,
        InvoiceService,
        LoggerServiceService,
        CustomerService
    ],
    declarations: [InvoiceComponent, InvoiceFormComponent],
    entryComponents: [
        InvoiceFormComponent
    ]
})
export class InvoiceModule {
}
