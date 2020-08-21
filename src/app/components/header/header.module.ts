import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import {RouterModule} from '@angular/router';
import {LoggerServiceService} from "@core/services/logger-service/logger-service.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
    providers: [LoggerServiceService]
})
export class HeaderModule { }
