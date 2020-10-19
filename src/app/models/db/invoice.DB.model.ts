import {HouseModel} from '@models/manage/house.model';
import {ProductModel} from '@models/manage/product.model';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';
import {CustomerModel} from '@models/manage/customer.model';
import {InvoiceDetailDBModel} from '@models/db/invoice.detail.DB.model';

export class InvoiceDBModel {
    code: string;
    item: Array<InvoiceDetailDBModel>;
    total: number;
    customer: string;
    room: string;
}
