import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.module.routing';
import { DashboardComponent } from './dashboard.component';
import {FormsModule} from "@angular/forms";
import {GridModule, SharedModule} from "@progress/kendo-angular-grid";
import {ExcelExportModule} from "@progress/kendo-angular-excel-export";

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        GridModule,
        SharedModule,
        ExcelExportModule
    ],
  declarations: [
    DashboardComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
