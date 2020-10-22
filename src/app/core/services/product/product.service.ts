import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '@models/manage/product.model';

@Injectable()
export class ProductService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) { }

    getProduct(id?: string) {
        if (!id) {
            return this.httpClient.get(this.host + 'api/product');
        } else {
            return this.httpClient.get(this.host + `api/product/${id}`);
        }
    }

    saveProduct(product: ProductModel) {
        return this.httpClient.post(this.host + 'api/product', product);
    }
}
