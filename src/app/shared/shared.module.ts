import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found';
import {KendoDateTimePickerDirective} from '@shared/directive/kendo-date-time-picker.directive';
import {KendoDatePickerDirective} from '@shared/directive/kendo-date-picker.directive';

@NgModule({
    declarations: [
        PageNotFoundComponent,
        KendoDateTimePickerDirective,
        KendoDatePickerDirective
    ],
    exports: [
        PageNotFoundComponent,
        KendoDatePickerDirective,
        KendoDateTimePickerDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
