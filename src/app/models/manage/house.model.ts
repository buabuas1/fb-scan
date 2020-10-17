import {HostModel} from '@models/manage/host.model';

export class HouseModel {
    _id: string;
    name: string;
    host: HostModel;
    address: string;
}
