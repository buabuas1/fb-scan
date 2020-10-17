import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

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
}
