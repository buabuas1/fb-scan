import { Component, OnInit } from '@angular/core';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {RoomModel} from '@models/manage/room.model';
import {PrintService} from '@core/services/print/print.service';
import {ProductService} from '@core/services/product/product.service';
import {RoomService} from '@core/services/room/room.service';
import {ModalService} from '@core/services/modal/modal.service';
import {InvoiceService} from '@core/services/invoice/invoice.service';
import {invoicePrintTemplate} from '../../common/constants';
import {RoomFormComponent} from './room-form/room-form.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;
    private data: Array<RoomModel> = [];
    private viewData: Array<RoomModel> = [];

    constructor(
        private printService: PrintService,
        private productService: ProductService,
        private roomService: RoomService,
        private modalService: ModalService,
        private invoiceService: InvoiceService
    ) {
    }

    ngOnInit() {
        this.getDataFromApi();
    }

    public print() {
        this.printService.printContent(invoicePrintTemplate, {
            code: 'Sơn Code',
            item: [
                {
                    name: 'Tiền phòng',
                    price: 3000000,
                    quantity: 1,
                    totalPrice: 3000000,
                    unit: 'Phòng'
                },
                {
                    name: 'Mạng',
                    Price: 100000,
                    Quantity: 1,
                    TotalPrice: 100000,
                    Unit: 'Phòng'
                },
                {
                    Name: 'Điện',
                    Price: 3500,
                    Quantity: 100,
                    TotalPrice: 350000,
                    Unit: 'Số',
                    Note: 'Số mới 300 - số cũ 200'
                },
                {
                    Name: 'Nước',
                    Price: 100000,
                    Quantity: 5,
                    TotalPrice: 500000,
                    Unit: 'Người'
                },
            ],
            Total: 5000000,
            HouseName: '38 Ngô sỹ Liên',
            HouseAddress: '17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa'
        });
    }

    getDataFromApi() {
        this.roomService.getRoom()
            .subscribe(rs => {
                this.data = rs as RoomModel[];
                this.viewData = this.data;
                this.initData();
            });
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

    public makeProductString(dataItem: RoomModel) {
        const rs = dataItem.item.map(i => `${i.name}: ${i.price}`).join(',');
        return rs.substring(0, rs.length - 2);
    }

    onItemSelect($event: CellClickEvent) {
        this.modalService.openModal({
            title: 'Sửa phòng',
            component: RoomFormComponent,
            inputs: [{key: 'room', value: $event.dataItem}],
            onSubmit: (area) => {
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }

    public addRoom() {
        this.modalService.openModal({
            title: 'Thêm mới phòng',
            component: RoomFormComponent,
            inputs: [{key: 'room', value: {}}],
            onSubmit: (area) => {
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }
}
