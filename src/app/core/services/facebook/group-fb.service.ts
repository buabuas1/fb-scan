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
    constructor(http: HttpClient, store: Store<AppStates>) {
        super(http, store);
    }

    getFeedOfGroup(groupId: string) {
        return this.getFb('1854370624678388/feed?limit=5', {});
    }

    postGroupComment(postId: string, params) {
        return this.postFb('3219247554857348/comments', params);
    }

    // postGroupContent(groupId: string, params) {
    //     return this.postFb(groupId + '/feed', params);
    // }
    postGroupContent(groupId: string, params) {
        return this.postFb(groupId + '/photos', params);
    }

    posMultipleImage(edgeId: string, imageUrls: Array<string>) {
        const request = (url: string) => from(this.postFbWithoutSDK(edgeId + '/photos', {
            url: url,
            published: false,
        }));
        const arr = [];
        // if (imageUrls && imageUrls.length > 0) {
        //     imageUrls.forEach(u => {
        //         arr.push(request(u));
        //     });
        //     return forkJoin(arr).subscribe(rs => console.log('rs', rs));
        // } else {
        //     Observable.of([]);
        // }
        return forkJoin([
            request(imageUrls[0]),
            request(imageUrls[1])
        ]).subscribe(rs => console.log('rs', rs));
    }
}
