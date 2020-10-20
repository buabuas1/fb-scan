import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {InvoiceModel} from '@models/manage/invoice.model';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';
import {RoomModel} from '@models/manage/room.model';
import {InvoiceDBModel} from '@models/db/invoice.DB.model';
import {InvoiceDetailDBModel} from '@models/db/invoice.detail.DB.model';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class InvoiceService {
    private host = environment.beHost;
    public invoiceChange$ = new Subject();
    constructor(private httpClient: HttpClient) {
    }

    getInvoice() {
        return this.httpClient.get(this.host + 'api/invoice');
    }

    makeInvoice(detailItems: Array<InvoiceDetailModel>, room: RoomModel) {
        return {
            item: detailItems,
            code: new Date().getTime().toString(),
            customer: room.customer,
            house: room.house,
            room: room,
            total: detailItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0)
        } as InvoiceModel;
    }

    recalculateInvoice(invoice: InvoiceModel) {
        invoice.total = invoice.item.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0);
        return invoice;
    }

    saveInvoice(invoice: InvoiceModel) {
        const invoiceDB = {
            code: invoice.code,
            customer: invoice.customer._id,
            room: invoice.room._id,
            total: invoice.total,
            item: invoice.item.map(i => {
                return {
                    product: i.product._id,
                    quantity: i.quantity,
                    price: i.price,
                    totalPrice: i.totalPrice,
                    unit: i.unit,
                    note: i.note,
                } as InvoiceDetailDBModel;
            })
        } as InvoiceDBModel;
        return this.httpClient.post(this.host + 'api/invoice', invoiceDB);
    }
}
