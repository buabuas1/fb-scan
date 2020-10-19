import {HouseModel} from '@models/manage/house.model';
import {ProductModel} from '@models/manage/product.model';

export class InvoiceDetailDBModel {
    _id: string;
    product: string;
    quantity: number;
    price: number;
    totalPrice: number;
    unit: string;
    note: string;
}
