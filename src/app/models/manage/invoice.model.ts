import {HouseModel} from '@models/manage/house.model';
import {ProductModel} from '@models/manage/product.model';
import {InvoiceDetailModel} from '@models/manage/invoice.detail.model';
import {CustomerModel} from '@models/manage/customer.model';
import {RoomModel} from '@models/manage/room.model';

export class InvoiceModel {
    _id: string;
    code: string;
    item: Array<InvoiceDetailModel>;
    total: number;
    customer: CustomerModel;
    house: HouseModel;
    room: RoomModel;
    createdDate: Date;
}
