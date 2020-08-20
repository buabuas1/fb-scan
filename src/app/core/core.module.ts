import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { Logger } from './services/logger';
import { SessionSettingsService } from './services/settings';
import {ModalService} from '@core/services/modal/modal.service';
import {BsModalService, ComponentLoaderFactory, ModalModule, PositioningService} from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
      ModalModule
  ],
  declarations: [],
  providers: [
    Logger,
    AuthService,
    AuthGuard,
    SessionSettingsService,
      BsModalService,
      ModalService,
      ComponentLoaderFactory,
      PositioningService
  ]
})
export class CoreModule { }
