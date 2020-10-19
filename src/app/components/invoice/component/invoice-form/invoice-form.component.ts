import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '@models/manage/room.model';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {ProductModel} from '@models/manage/product.model';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';
import {InvoiceModel} from '@models/manage/invoice.model';
import {PrintService} from '@core/services/print/print.service';
import {invoicePrintTemplate, PrintTypes} from '../../../../common/constants';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

@Component({
    selector: 'app-invoice-form',
    templateUrl: './invoice-form.component.html',
    styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() room: RoomModel;

    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;
    private invoice: InvoiceModel;
    constructor(private printService: PrintService,
                private invoiceService: InvoiceService,
                private loggerService: LoggerServiceService) {
    }

    ngOnInit() {
        this.makeInvoice();
    }

    onSave() {
        this.invoiceService.saveInvoice(this.invoice)
            .subscribe(rs => {
                this.loggerService.success('Thành công');
                this.submit.emit(this.invoice);
            }, error => {
                this.loggerService.error(JSON.stringify(error));
            });
    }

    onCancel() {
        this.close.emit();
    }

    private makeInvoice(): void {
        const detailItems = this.makeDetailItem(this.room.item);
        this.gridView = {
            data: detailItems.slice(this.skip, this.skip + this.pageSize),
            total: detailItems.length
        };
        this.invoice = this.invoiceService.makeInvoice(detailItems, this.room);
    }

    private makeDetailItem(data: Array<ProductModel>) {
        return data.map(p => {
           const ivd = {
               quantity: 1,
               price: p.price,
               totalPrice: p.price,
               product: p,
               name: p.name,
               unit: p.unit,
           } as InvoiceDetailModel;
           return ivd;
        });
    }

    onItemSelect($event: CellClickEvent) {

    }

    public pageChange($event: PageChangeEvent) {

    }

    public recalculate(dataItem: InvoiceDetailModel) {
        dataItem.totalPrice = dataItem.price * dataItem.quantity;
        this.invoice = this.invoiceService.recalculateInvoice(this.invoice);
    }

    public onPrint() {
        this.printService.printContent(invoicePrintTemplate, this.invoice, true, PrintTypes.Invoice);
    }
}
