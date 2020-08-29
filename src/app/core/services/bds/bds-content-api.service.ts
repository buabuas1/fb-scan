import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BdsContentApiService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient) {
    }

    getFbContent(postTime: Date) {
        return this.httpClient.get(this.host + 'api/fbcontent', {params:
                {postTime: postTime.toISOString()}});
    }

    saveFbContent(data) {
        return this.httpClient.post(this.host + 'api/fbcontent/bulk', {data: data});
    }
}
