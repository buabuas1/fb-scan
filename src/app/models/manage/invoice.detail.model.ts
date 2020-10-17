import {HouseModel} from '@models/manage/house.model';
import {ProductModel} from '@models/manage/product.model';

export class InvoiceDetailModel {
    _id: string;
    name: string;
    product: ProductModel;
    quantity: number;
    price: number;
    totalPrice: number;
    unit: string;
}
