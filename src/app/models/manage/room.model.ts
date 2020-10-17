import {HouseModel} from '@models/manage/house.model';
import {ProductModel} from '@models/manage/product.model';
import {CustomerModel} from '@models/manage/customer.model';

export class RoomModel {
    _id: string;
    name: string;
    modifiedDate: any;
    house: HouseModel;
    item: Array<ProductModel>;
    customer: CustomerModel;
}
