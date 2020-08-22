import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found';
import {KendoDateTimePickerDirective} from '@shared/directive/kendo-date-time-picker.directive';
import {KendoDatePickerDirective} from '@shared/directive/kendo-date-picker.directive';
import {ModalComponent} from '../common/modal/modal.component';
import {ConfirmComponent} from '../common/confirm/confirm.component';
import {BsModalService} from 'ngx-bootstrap';
import {GridModule} from '@progress/kendo-angular-grid';
import {SharedModule as KendoShare} from '@progress/kendo-angular-grid';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        KendoDateTimePickerDirective,
        KendoDatePickerDirective,
        ModalComponent,
        ConfirmComponent
    ],
    exports: [
        PageNotFoundComponent,
        KendoDatePickerDirective,
        KendoDateTimePickerDirective,
        ModalComponent,
        ConfirmComponent,
        GridModule,
        KendoShare
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        GridModule,
        KendoShare
    ],
    entryComponents: [
        ModalComponent,
        ConfirmComponent
    ],
    providers: [
        BsModalService
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
