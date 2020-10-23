import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {RoomModel} from '@models/manage/room.model';
import {RoomDBModel} from '@models/db/room.DB.model';

@Injectable()
export class RoomService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) { }

    getRoom(id?: string) {
        if (!id) {
            return this.httpClient.get(this.host + 'api/room');
        } else {
            return this.httpClient.get(this.host + `api/room/${id}`);
        }
    }

    saveRoom(room: RoomModel) {
        const roomDB = {
            _id: room._id,
            customer: room.customer ? room.customer._id : '',
            house: room.house ? room.house._id : '',
            item: room.item ? room.item.map(i => i._id) : [],
            name: room.name,
            numberOfCustomer: room.numberOfCustomer
        } as RoomDBModel;
        return this.httpClient.post(this.host + 'api/room', roomDB);
    }
}
