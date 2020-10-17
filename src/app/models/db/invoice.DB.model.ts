import {HouseModel} from '@models/manage/house.model';
import {ProductModel} from '@models/manage/product.model';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';
import {CustomerModel} from '@models/manage/customer.model';

export class InvoiceDBModel {
    code: string;
    item: Array<string>;
    total: number;
    customer: string;
    room: string;
}
