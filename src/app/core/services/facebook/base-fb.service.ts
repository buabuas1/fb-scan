import {Injectable} from '@angular/core';
import {RequestOptionsArgs} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';
import {getFbAuthToken} from '../../../state-management/reducers/fb-auth.reducer';
import {Observable} from 'rxjs';
declare var FB: any;
@Injectable()
export class BaseFbService {
    private fbApi = environment.fbApi;
    private currentToken = '';
    constructor(private http: HttpClient, private store: Store<AppStates>) {
        this.store.select(getFbAuthToken)
            .subscribe(tks => {
                if (tks && tks.length > 0) {
                    this.currentToken =  tks[0].accessToken;
                }
            });
    }

    getFb(url: string, option: RequestOptionsArgs) {
        return Observable.create(rs => {
            (FB as any).api(
                '/' + url,
                function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                        rs.next(response);
                    } else {
                        rs.error(response.error);
                    }
                }
            );
        });

        // const op = {
        //     params: {
        //     access_token: this.currentToken
        // }};
        // if (!!option) {
        //     op.params = Object.assign(op.params, option.params);
        // }
        // return this.http.get(this.fbApi + url, op);
    }

    postFb(url: string, option: RequestOptionsArgs) {
        return Observable.create(rs => {
            (FB as any).api(
                '/' + url,
                'POST',
                option,
                function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                        rs.next(response);
                    } else {
                        rs.error(response.error);
                    }
                }
            );
        });

        // const op = {
        //     params: {
        //     access_token: this.currentToken
        // }};
        // if (!!option) {
        //     op.params = Object.assign(op.params, option.params);
        // }
        // return this.http.get(this.fbApi + url, op);
    }


}
