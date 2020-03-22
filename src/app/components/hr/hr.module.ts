import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrComponent } from './hr.component';
import {HrModuleRouting} from './hr.module.routing';
import {SharedModule} from '@shared/shared.module';
import {CoreModule} from '@core/core.module';
import {HeaderModule} from '../header';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    HrModuleRouting,
    HeaderModule,
  ],
  declarations: [HrComponent]
})
export class HrModule { }
