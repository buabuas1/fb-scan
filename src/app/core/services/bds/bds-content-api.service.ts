import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class BdsContentApiService {
    private host = environment.beHost;

    constructor(private httpClient: HttpClient) {
    }

    getFbContent(postTime: Date, groupIds: string) {
        return this.httpClient.get(this.host + 'api/fbcontent', {
            params:
                {postTime: postTime.toISOString(), groupIds: groupIds}
        });
    }

    saveFbContent(data) {
        return this.httpClient.post(this.host + 'api/fbcontent/bulk', {data: data});
    }

    getFindRoomChart(postTime: Date, limit: number) {
        const params = new HttpParams({
            fromObject: {
                postTime: postTime.toISOString(),
                limit: limit.toString(),
            }
        });
        return this.httpClient.get(this.host + 'api/fbcontent/chart', {
            params: params
        });
    }
}
