import {Component, OnInit} from '@angular/core';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {InvoiceModel} from '@models/manage/invoice.model';
import {CustomerModel} from '@models/manage/customer.model';
import {RoomModel} from '@models/manage/room.model';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {IntlService} from '@progress/kendo-angular-intl';
import {BaseComponent} from '@shared/base/base.component';
import {PrintService} from '@core/services/print/print.service';
import {invoicePrintTemplate, PrintTypes} from '../../../../common/constants';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';

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
    public expandedRow: number;
    constructor(private invoiceService: InvoiceService,
                public intlService: IntlService,
                private printService: PrintService
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
        if (this.expandedRow === $event.rowIndex) {
            $event.sender.collapseRow($event.rowIndex);
        } else {
            $event.sender.expandRow($event.rowIndex);
            $event.sender.collapseRow(this.expandedRow);
            this.expandedRow = $event.rowIndex;
        }
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

    public printInvoice(dataItem) {
        const invoice = this.convertToInvoice(dataItem);
        this.printService.printContent(invoicePrintTemplate, invoice, true, PrintTypes.Invoice);
    }

    private convertToInvoice(dataItem: any) {
        return {
            code: dataItem.code,
            total: dataItem.total,
            room: dataItem.room,
            house: dataItem.room.house,
            customer: dataItem.customer,
            item: dataItem.item.map(i => {
                return {
                    price: i.price,
                    quantity: i.quantity,
                    totalPrice: i.totalPrice,
                    unit: i.product.unit,
                    name: i.product.name,
                    note: i.note
                } as InvoiceDetailModel;
            })
        } as InvoiceModel;
    }
}
