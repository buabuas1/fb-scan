import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseFbService} from '@core/services/facebook/base-fb.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GroupFbService extends BaseFbService {
    constructor(http: HttpClient) {
        super(http);
    }

    getFeedOfGroup(groupId: string) {
        return this.getFb('1854370624678388/feed?limit=5', {});
    }
}
