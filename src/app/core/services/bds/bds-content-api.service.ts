import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class BdsContentApiService {
    private host = environment.beHost;

    constructor(private httpClient: HttpClient) {
    }

    getFbContent(postTime: Date, groupIds: string, option: any) {
        const params = {
            postTime: postTime.toISOString(),
            groupIds: groupIds,
            createdDate: option.createdDate.toISOString(),
        } as any;
        if (option.numberOfRooms && option.numberOfRooms > 0) {
            params.numberOfRooms = option.numberOfRooms;
        }
        return this.httpClient.get(this.host + 'api/fbcontent', {
            params:
            params
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

    getTopPostChart(postTime: Date, limit: number, option: any) {
        const params = new HttpParams({
            fromObject: {
                postTime: postTime.toISOString(),
                limit: limit.toString(),
                commentStatus: option.commentStatus
            }
        });
        return this.httpClient.get(this.host + 'api/fbcontent/chart/top/post', {
            params: params
        });
    }

    getTopPostUserChart(postTime: Date, limit: number, option: any) {
        const params = new HttpParams({
            fromObject: {
                postTime: postTime.toISOString(),
                limit: limit.toString(),
                commentStatus: option.commentStatus
            }
        });
        return this.httpClient.get(this.host + 'api/fbcontent/chart/top/postbyuser', {
            params: params
        });
    }

    saveArea(area) {
        return this.httpClient.post(this.host + 'api/area', area);
    }

    getArea() {
        return this.httpClient.get(this.host + 'api/area');
    }

    deleteArea(area) {
        return this.httpClient.delete(this.host + `api/area/${area._id}`);
    }

    markPostIsCommented(content, isMark) {
        return isMark ?
            this.httpClient.post(this.host + 'api/fbcontent/mark', content) :
            this.httpClient.post(this.host + 'api/fbcontent/unmark', content);
    }
}
