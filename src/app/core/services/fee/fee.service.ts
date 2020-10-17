import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FeeService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) { }

    getFee(id?: string) {
        if (!id) {
            return this.httpClient.get(this.host + 'api/fee');
        } else {
            return this.httpClient.get(this.host + `api/fee/${id}`);
        }
    }
}
