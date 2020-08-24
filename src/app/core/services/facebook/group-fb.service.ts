import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseFbService} from '@core/services/facebook/base-fb.service';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';
import {from} from 'rxjs/observable/from';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class GroupFbService extends BaseFbService {
    public FEED_URL = '/feed';
    public PHOTOS_URL = '/photos';
    constructor(http: HttpClient, store: Store<AppStates>) {
        super(http, store);
    }

    getFeedOfGroup(groupId: string) {
        return this.getFbWithoutSDK('1854370624678388/feed?limit=5', {});
    }

    postGroupComment(postId: string, params) {
        return this.postFb('3219247554857348/comments', params);
    }

    postGroupContent(groupId: string, params) {
        if (params.imageUrls && params.imageUrls.length > 0) {
            return this.posMultipleImage(groupId, params.imageUrls || [])
                .switchMap(rs => {
                    delete params.imageUrls;
                    params.attached_media = rs.map(r => {
                        return {'media_fbid': (r as any).id};
                    });
                    return this.postFbWithoutSDK(groupId + this.FEED_URL, params);
                });
        } else {
            return this.postFbWithoutSDK(groupId + this.FEED_URL, params);
        }

    }



    public posMultipleImage(edgeId: string, imageUrls: Array<string>) {
        const request = (url: string) => from(this.postFbWithoutSDK(edgeId + this.PHOTOS_URL, {
            url: url,
            published: false,
        }));
        const arr = [];
        if (imageUrls && imageUrls.length > 0) {
            imageUrls.forEach(u => {
                arr.push(request(u));
            });
        } else {
            Observable.of([]);
        }
        return forkJoin(arr);
    }
}
