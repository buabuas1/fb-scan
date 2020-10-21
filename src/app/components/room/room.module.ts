import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomComponent} from './room.component';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {InvoiceModuleRouting} from '../invoice/invoice.module.routing';
import {HeaderModule} from '../header';
import {FormsModule} from '@angular/forms';
import {IntlModule} from '@progress/kendo-angular-intl';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {PrintService} from '@core/services/print/print.service';
import {ProductService} from '@core/services/product/product.service';
import {RoomService} from '@core/services/room/room.service';
import {ModalService} from '@core/services/modal/modal.service';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {CustomerService} from '@core/services/customer/customer.service';
import {SuperAdminGuard} from '@core/services/auth';
import {RoomModuleRouting} from './room.module.routing';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        RoomModuleRouting,
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
        CustomerService,
        SuperAdminGuard
    ],
    declarations: [RoomComponent]
})
export class RoomModule {
}
