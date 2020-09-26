import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.module.routing';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent
  ],
    providers: [
        LoggerServiceService
    ]
})
export class AuthModule { }
