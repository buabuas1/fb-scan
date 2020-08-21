import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermComponent } from './term.component';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {HeaderModule} from '../header';
import {TermModuleRouting} from './term.module.routing';

@NgModule({
  imports: [
    CommonModule,
      CoreModule,
      SharedModule,
      HeaderModule,
      TermModuleRouting
  ],
  declarations: [TermComponent]
})
export class TermModule { }
