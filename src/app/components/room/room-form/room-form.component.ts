import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '@models/manage/room.model';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {ProductModel} from '@models/manage/product.model';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';
import {InvoiceModel} from '@models/manage/invoice.model';
import {PrintService} from '@core/services/print/print.service';
import {invoicePrintTemplate, PrintTypes, ProductTypesEnum} from '../../../common/constants';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {CustomerModel} from '@models/manage/customer.model';
import {CustomerService} from '@core/services/customer/customer.service';
import {HouseService} from '@core/services/house/house.service';
import {HouseModel} from '@models/manage/house.model';
import {ModalService} from '@core/services/modal/modal.service';
import {ProductSelectionComponent} from '../product-selection/product-selection.component';
import {RoomService} from '@core/services/room/room.service';

@Component({
    selector: 'app-invoice-form',
    templateUrl: './room-form.component.html',
    styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() room: RoomModel;

    public kendo = (window as any).kendo;
    public gridView: GridDataResult;
    public pageSize = 10;
    public skip = 0;
    private invoice: InvoiceModel;
    public listCustomer: Array<CustomerModel> = [];
    public listHouse: Array<HouseModel> = [];
    public detailItems: InvoiceDetailModel[];
    constructor(private printService: PrintService,
                private invoiceService: InvoiceService,
                private loggerService: LoggerServiceService,
                private customerService: CustomerService,
                private houseService: HouseService,
                private modalService: ModalService,
                private roomService: RoomService) {
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
        this.detailItems = this.makeDetailItem(this.room.item);
        if (this.room.item) {
            this.gridView = {
                data: this.detailItems.slice(this.skip, this.skip + this.pageSize),
                total: this.detailItems.length
            };
        }

        this.invoice = this.invoiceService.makeInvoice(this.detailItems, this.room);
    }

    private makeDetailItem(data: Array<ProductModel>) {
        return data.map(p => {
           const ivd = {
               quantity: p.type === ProductTypesEnum.ByPerson ? this.room.numberOfCustomer : 1,
               price: p.price,
               product: p,
               name: p.name,
               unit: p.unit,
           } as InvoiceDetailModel;
           ivd.totalPrice = ivd.quantity * ivd.price;
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
        // const detailItems = this.makeDetailItem(this.room.item);
        // this.invoice = this.invoiceService.makeInvoice(this.detailItems, this.room);
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
            title: 'Chọn hàng',
            component: ProductSelectionComponent,
            inputs: [{key: 'room', value: this.room.item}],
            onSubmit: (items) => {
                this.room.item = [...this.room.item, ...items];
                this.makeRoomProductGrid();
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }

    public onSaveRoom() {
        this.roomService.saveRoom(this.room)
            .subscribe(r => {
                this.loggerService.success('Thành công');
                this.submit.next(this.room);
            }, error => this.loggerService.error(JSON.stringify(error)));
    }
}
