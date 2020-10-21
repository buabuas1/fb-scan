import {Component, OnInit} from '@angular/core';
import {PrintService} from '@core/services/print/print.service';
import {invoicePrintTemplate} from '../../common/constants';
import {CellClickEvent, GridDataResult, PageChangeEvent, SelectionEvent} from '@progress/kendo-angular-grid';
import {ProductService} from '@core/services/product/product.service';
import {RoomService} from '@core/services/room/room.service';
import {RoomModel} from '@models/manage/room.model';
import {ModalService} from '@core/services/modal/modal.service';
import {AreaFormComponent} from '../dashboard/component/area-form/area-form.component';
import {RoomFormComponent} from '../room/room-form/room-form.component';
import {InvoiceService} from '@core/services/invoice/invoice.service';

@Component({
    selector: 'app-hr',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    constructor(
        private printService: PrintService,
        private productService: ProductService,
        private roomService: RoomService,
        private modalService: ModalService,
        private invoiceService: InvoiceService
    ) {
    }

    ngOnInit() {
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
}
