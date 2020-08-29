import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BdsContentApiService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) {
    }

    getFbContent() {
        return this.httpClient.get(this.host + 'api/fbcontent');
    }

    saveFbContent() {
        return this.httpClient.post(this.host + 'api/fbcontent', {});
    }
}
