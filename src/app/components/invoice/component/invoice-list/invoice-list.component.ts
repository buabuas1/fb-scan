import {Component, OnInit} from '@angular/core';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {InvoiceModel} from '@models/manage/invoice.model';
import {CustomerModel} from '@models/manage/customer.model';
import {RoomModel} from '@models/manage/room.model';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {IntlService} from '@progress/kendo-angular-intl';
import {BaseComponent} from '@shared/base/base.component';

@Component({
    selector: 'app-invoice-list',
    templateUrl: './invoice-list.component.html',
    styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent extends BaseComponent implements OnInit {
    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;
    private invoice: InvoiceModel;
    public listCustomer: Array<CustomerModel> = [];
    public viewData: Array<InvoiceModel> = [];
    public data: Array<InvoiceModel> = [];
    public kendo = (window as any).kendo;
    constructor(private invoiceService: InvoiceService,
                public intlService: IntlService
    ) {
        super();
    }

    ngOnInit() {
        this.getDataFromApi();
        this.invoiceService.invoiceChange$
            .takeUntil(this.destroyed$)
            .subscribe(_ => {
               this.getDataFromApi();
            });
    }

    public onItemSelect($event: CellClickEvent) {

    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadItems();
    }

    private loadItems(): void {
        this.gridView = {
            data: this.viewData.slice(this.skip, this.skip + this.pageSize),
            total: this.viewData.length
        };
    }

    private initData() {
        this.loadItems();
    }

    getDataFromApi() {
        this.invoiceService.getInvoice()
            .subscribe((rs: any) => {
                this.data = rs.map(p => {
                    // p.createdDate = new Date(p.createdDate);
                    return p as InvoiceModel;
                });
                this.viewData = this.data;
                this.initData();
            });
    }
}
