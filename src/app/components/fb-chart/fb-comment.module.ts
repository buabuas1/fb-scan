import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FbCommentComponent} from './fb-chart/fb-comment.component';
import {FbCommentModuleRouting} from './fb-comment.module.routing';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';
import {ModalService} from '@core/services/modal/modal.service';
import {GroupFbService} from '@core/services/facebook/group-fb.service';
import {ChartModule} from '@progress/kendo-angular-charts';
import {BdsContentApiService} from "@core/services/bds/bds-content-api.service";
import {LoggerServiceService} from "@core/services/logger-service/logger-service.service";
import {FormsModule} from "@angular/forms";
import {AuthService} from '@core/services/auth';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        HeaderModule,
        FbCommentModuleRouting,
        ChartModule,
        FormsModule
    ],
    declarations: [FbCommentComponent],
    providers: [
        ModalService,
        GroupFbService,
        BdsContentApiService,
        LoggerServiceService,
        AuthService
    ],
    entryComponents: []
})
export class FbCommentModule {
}
