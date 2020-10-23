import {HouseModel} from '@models/manage/house.model';
import {ProductModel} from '@models/manage/product.model';
import {CustomerModel} from '@models/manage/customer.model';

export class RoomDBModel {
    _id: string;
    name: string;
    modifiedDate: any;
    house: string;
    item: Array<string>;
    customer: string;
    numberOfCustomer: number;
}
