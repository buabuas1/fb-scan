import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerListComponent} from './customer-list/customer-list.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';
import {FormsModule} from '@angular/forms';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {CustomerModuleRouting} from './customer.module.routing';
import {ProductService} from '@core/services/product/product.service';
import {RoomService} from '@core/services/room/room.service';
import {ModalService} from '@core/services/modal/modal.service';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {CustomerService} from '@core/services/customer/customer.service';
import {SuperAdminGuard} from '@core/services/auth';
import {HouseService} from '@core/services/house/house.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        CustomerModuleRouting,
        HeaderModule,
        FormsModule,
        DropDownListModule,
    ],
    declarations: [
        CustomerListComponent,
        CustomerFormComponent
    ],
    providers: [
        ModalService,
        LoggerServiceService,
        CustomerService,
        SuperAdminGuard,
    ],
    entryComponents: [
        CustomerFormComponent
    ]
})
export class CustomerModule {
}
