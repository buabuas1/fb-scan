import {Component, OnInit} from '@angular/core';
import {PrintService} from '@core/services/print/print.service';
import {invoicePrintTemplate} from '../../common/constants';

@Component({
    selector: 'app-hr',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

    constructor(
        private printService: PrintService
    ) {
    }

    ngOnInit() {
    }

    public print() {
        this.printService.printContent(invoicePrintTemplate, {
            Code: 'Sơn Code',
            Item: [
                {
                    Name: 'Tiền phòng',
                    Price: 3000000,
                    Quantity: 1,
                    TotalPrice: 3000000,
                    Unit: 'Phòng'
                },
                {
                    Name: 'Mạng',
                    Price: 100000,
                    Quantity: 1,
                    TotalPrice: 100000,
                    Unit: 'Phòng'
                },
                {
                    Name: 'Nước',
                    Price: 100000,
                    Quantity: 5,
                    TotalPrice: 500000,
                    Unit: 'Người'
                },
            ],
            HouseName: '38 Ngô sỹ Liên',
            HouseAddress: '17 ngõ 38 Ngô Sỹ Liên, Văn Miếu, Đống Đa'
        });
    }
}
