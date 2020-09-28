import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {DashboardRoutingModule} from './dashboard.module.routing';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {GridModule, SharedModule as SharedModuleKendo} from '@progress/kendo-angular-grid';
import {ExcelExportModule} from '@progress/kendo-angular-excel-export';
import {DateInputsModule} from '@progress/kendo-angular-dateinputs';
import {SharedModule} from '@shared/shared.module';
import {DropDownsModule} from '@progress/kendo-angular-dropdowns';
import {GroupFbService} from '@core/services/facebook/group-fb.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {BdsTypeService} from '@core/services/bds/bds-type.service';
import {BdsContentApiService} from '@core/services/bds/bds-content-api.service';
import {AuthService} from '@core/services/auth';
import {ToolKitService} from '@core/services/tool-kit/tool-kit.service';
import { AreaFormComponent } from './component/area-form/area-form.component';
import {ModalService} from '@core/services/modal/modal.service';
import { AreaListComponent } from './component/area-list/area-list.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        GridModule,
        SharedModuleKendo,
        ExcelExportModule,
        DateInputsModule,
        SharedModule,
        DropDownsModule
    ],
    providers: [DecimalPipe,
        GroupFbService,
        LoggerServiceService,
        BdsTypeService,
        BdsContentApiService,
        AuthService,
        ToolKitService,
        ModalService
    ],
    declarations: [
        DashboardComponent,
        AreaFormComponent,
        AreaListComponent
    ],
    exports: [
        DashboardComponent
    ],
    entryComponents: [
        AreaFormComponent,
        AreaListComponent
    ]
})
export class DashboardModule {
}
