import {Injectable} from '@angular/core';
import {RequestOptionsArgs} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BaseFbService {
    private fbApi = environment.fbApi;
    constructor(private http: HttpClient) {
    }

    getFb(url: string, option: RequestOptionsArgs) {
        const op = {
            params: {
            access_token: 'EAAp5LQdowfsBAF8pylZCuPEldEQ2qMN7XwpTKw9uPuLLE2ZA74GzS4yM1E5frxGXZBqo22PEfnMyaMXRvkSji2VnDNu8mq2IgiQJpTnqL3DGyfEtVZA2D2MLM5XqZCD6oAkVyoQls4CH6EfMHzQQaX8yy9WH6aSTVXJ6bZBkimVu4ZCoZAy9y065zm3Qj482ZCucZD'
        }};
        if (!!option) {
            op.params = Object.assign(op.params, option.params);
        }
        return this.http.get(this.fbApi + url, op);
    }


}
