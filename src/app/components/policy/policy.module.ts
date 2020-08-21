import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PolicyComponent} from './policy.component';
import {PolicyModuleRouting} from './policy.module.routing';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        CoreModule,
        PolicyModuleRouting,
        HeaderModule
    ],
    declarations: [PolicyComponent]
})
export class PolicyModule {
}
