import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HouseService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) { }

    getHouse(id?: string) {
        if (!id) {
            return this.httpClient.get(this.host + 'api/house');
        } else {
            return this.httpClient.get(this.host + `api/house/${id}`);
        }
    }
}
