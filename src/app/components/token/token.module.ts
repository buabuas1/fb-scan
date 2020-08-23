import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TokenComponent} from './token.component';
import {TokenFormComponent} from './token-form/token-form.component';
import {TokenModuleRouting} from './token.module.routing';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';
import {SuperAdminGuard} from '@core/services/auth';
import {ModalService} from "@core/services/modal/modal.service";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        HeaderModule,
        TokenModuleRouting,
        FormsModule,
    ],
    declarations: [TokenComponent, TokenFormComponent],
    providers: [
        SuperAdminGuard,
        ModalService
    ],
    entryComponents: [
        TokenFormComponent
    ]
})
export class TokenModule {
}
