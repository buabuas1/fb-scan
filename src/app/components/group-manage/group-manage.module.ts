import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupManageComponent} from './group-manage/group-manage.component';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';
import {FormsModule} from '@angular/forms';
import {GroupManageModuleRouting} from './group-manage.module.routing';
import {GroupManageApiService} from '@core/services/group-manage/group-manage-api.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        HeaderModule,
        FormsModule,
        GroupManageModuleRouting
    ],
    providers: [
        GroupManageApiService,
        LoggerServiceService
    ],
    declarations: [GroupManageComponent]
})
export class GroupManageModule {
}
