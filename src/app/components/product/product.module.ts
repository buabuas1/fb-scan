import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';
import {FormsModule} from '@angular/forms';
import {IntlModule} from '@progress/kendo-angular-intl';
import {DropDownListModule} from '@progress/kendo-angular-dropdowns';
import {ProductModuleRouting} from './product.module.routing';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductService} from '@core/services/product/product.service';
import { ProductFormComponent } from './product-form/product-form.component';
import {SuperAdminGuard} from '@core/services/auth';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';


@NgModule({
    imports: [
        CommonModule,
        CommonModule,
        SharedModule,
        CoreModule,
        ProductModuleRouting,
        HeaderModule,
        FormsModule,
        IntlModule,
        DropDownListModule
    ],
    declarations: [ProductListComponent, ProductFormComponent],
    providers: [
        ProductService,
        SuperAdminGuard,
        LoggerServiceService
    ],
    entryComponents: [
        ProductFormComponent
    ]
})
export class ProductModule {
}
