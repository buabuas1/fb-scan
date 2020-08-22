import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseFbService} from '@core/services/facebook/base-fb.service';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';

@Injectable()
export class GroupFbService extends BaseFbService {
    constructor(http: HttpClient, store: Store<AppStates>) {
        super(http, store);
    }

    getFeedOfGroup(groupId: string) {
        return this.getFb('1854370624678388/feed?limit=5', {});
    }

    postGroupComment(postId: string, params) {
        return this.postFb('3219247554857348/comments', params);
    }
}
