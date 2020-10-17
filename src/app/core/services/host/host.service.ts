import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HostService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) { }

    getHost(id?: string) {
        if (!id) {
            return this.httpClient.get(this.host + 'api/host');
        } else {
            return this.httpClient.get(this.host + `api/host/${id}`);
        }
    }
}
