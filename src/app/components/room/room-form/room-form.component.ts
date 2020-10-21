import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '@models/manage/room.model';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {ProductModel} from '@models/manage/product.model';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';
import {InvoiceModel} from '@models/manage/invoice.model';
import {PrintService} from '@core/services/print/print.service';
import {invoicePrintTemplate, PrintTypes} from '../../../common/constants';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {CustomerModel} from '@models/manage/customer.model';
import {CustomerService} from '@core/services/customer/customer.service';
import {HouseService} from '@core/services/house/house.service';
import {HouseModel} from '@models/manage/house.model';
import {ModalService} from '@core/services/modal/modal.service';
import {ProductSelectionComponent} from '../product-selection/product-selection.component';

@Component({
    selector: 'app-invoice-form',
    templateUrl: './room-form.component.html',
    styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() room: RoomModel;

    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;
    private invoice: InvoiceModel;
    public listCustomer: Array<CustomerModel> = [];
    public listHouse: Array<HouseModel> = [];
    constructor(private printService: PrintService,
                private invoiceService: InvoiceService,
                private loggerService: LoggerServiceService,
                private customerService: CustomerService,
                private houseService: HouseService,
                private modalService: ModalService) {
    }

    ngOnInit() {
        this.makeRoomProductGrid();
        this.getCustomerFromApi();
        this.getHouseFromApi();
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

    private makeRoomProductGrid(): void {
        // const detailItems = this.makeDetailItem(this.room.item);
        if (this.room.item) {
            this.gridView = {
                data: this.room.item.slice(this.skip, this.skip + this.pageSize),
                total: this.room.item.length
            };
        }

        // this.invoice = this.invoiceService.makeInvoice(detailItems, this.room);
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

    public onCustomerChange($event: any) {

    }

    public getCustomerFromApi() {
        this.customerService.getCustomer()
            .subscribe(rs => {
                this.listCustomer = rs as CustomerModel[];
            });
    }

    public getHouseFromApi() {
        this.houseService.getHouse()
            .subscribe(rs => {
                this.listHouse = rs as HouseModel[];
            });
    }

    public addProduct() {
        this.modalService.openModal({
            title: 'Sửa phòng',
            component: ProductSelectionComponent,
            inputs: [{key: 'room', value: this.room.item}],
            onSubmit: (area) => {
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }

    public onSaveRoom() {

    }
}
