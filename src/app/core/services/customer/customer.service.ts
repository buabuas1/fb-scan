import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CustomerModel} from '@models/manage/customer.model';

@Injectable()
export class CustomerService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) { }

    getCustomer(id?: string) {
        if (!id) {
            return this.httpClient.get(this.host + 'api/customer');
        } else {
            return this.httpClient.get(this.host + `api/customer/${id}`);
        }
    }

    saveCustomer(customer: CustomerModel) {
        return this.httpClient.post(this.host + 'api/customer', customer);
    }
}
