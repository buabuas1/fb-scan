/* tslint:disable:max-line-length */
import {Injectable} from '@angular/core';
import {RequestOptionsArgs} from '@angular/http';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';
import {getFbAuthToken} from '../../../state-management/reducers/fb-auth.reducer';
import {Observable} from 'rxjs/Observable';
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

    getFbWithoutSDK(url: string, option: RequestOptionsArgs) {
        // return Observable.create(rs => {
        //     (FB as any).api(
        //         '/' + url,
        //         function (response) {
        //             if (response && !response.error) {
        //                 /* handle the result */
        //                 rs.next(response);
        //             } else {
        //                 rs.error(response.error);
        //             }
        //         }
        //     );
        // });

        const op = {
            params: {
            access_token: this.currentToken
        }};
        if (!!option) {
            op.params = Object.assign(op.params, option.params);
        }
        return this.http.get(this.fbApi + url, op);
    }

    postFb(url: string, option: any): Observable<any[]> {
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

    postFbWithoutSDK(url: string, option: any) {
        let op = {
            access_token: this.currentToken
        };
        if (!!option) {
            op = Object.assign(op, option);
        }
        return this.http.post(this.fbApi + url, op);
    }

    getFBContent() {
        const formData = new FormData();

// append your data
        formData.append('av', '100002893127625');
        formData.append('__user', '100002893127625');
        formData.append('__a', '1');
        formData.append('__dyn', '7AzHJ16U9k9wxxt0BwRyaG5UjBWo2nDwAxu13wsonmbwSwAyU8EW3K1uwJyEiwp8O2S1DwUx60xU8E1J9EtwMwbW0NEszU887m224obEvy8465o-cBwfi12wOKdwGwFyFE-1-y85S5o9kbxSEtwi831wLxG4UaoC9xy48aU8od8-Uqxy1qxi4UaEW2G1jxS6FocobElxm3y2K2DUrw-wAw');
        // tslint:disable-next-line:max-line-length
        formData.append('__csr', 'jXgyAAAWugMBF4iDJfyXHQvHgzp4LiBCK8mGrZ8iEzWL8liSl4zAqmiuViiubhjTCJE9OBptBpGxsgEiD5dKm8DjagS9gEF4eGagHCBKJDAx6owyFmFb8HKb-9xgXADKemlGbVVuucZcwnmF44Eox-XzBCEJ1Vx9AQ9AGQiEgyqx6lDiCzpHCx6iAWG8wPDyCh4Kbyvh9bX_J4yGwnuacqeyqhoIUyicqmA45LGchaxt7CG2i2W2pXoBxem-4y2p8E40GqxH9K4UWihyPrRwxBGcG6d4Qf5Hy7Kqx8sGS1a9m9yC4kcLGUmyRF1a7QUao9NDPDxTACDh212fK9wF8Upg5u3a9gQmah2bgOfwFwKJyU6tF1FwtVU511bDK5odEswiA5U4a9efwKUmwa6766o2jw2RUeUSVvVoy6XwlOoWqczkmmfIyJ2Zo4a0AEf8490ECR83OsN43y4WUMxk9c5o9Hxm1mwyxaEGgE32w3nU6q17wkeq64583mw7W58EuKcyi122vgDwiE0cEmum4dwQw');
        formData.append('__req', '7x');
        formData.append('__beoa', '1');
        formData.append('__pc', 'EXP2');
        formData.append('dpr', '1');
        formData.append('__ccg', 'EXCELLENT');
        formData.append('__rev', '1002565699');
        formData.append('__s', '9pma98');
        formData.append('__hsi', '6864912330328609279-0');
        formData.append('__comet_req', '1');
        formData.append('fb_dtsg', 'AQFZmwYduUat');
        formData.append('jazoest', '22232');
        formData.append('__spin_r', '1002565699');
        formData.append('__spin_b', 'trunk');
        formData.append('__spin_t', '1598361956');
        formData.append('fb_api_caller_class', 'RelayModern');
        formData.append('fb_api_req_friendly_name', 'CometGroupDiscussionRootSuccessQuery');
        formData.append('variables', '{"UFI2CommentsProvider_commentsKey"');
        formData.append('server_timestamps', 'true');
        formData.append('doc_id', '3163378080376521');

        return this.http.post('https://www.facebook.com/api/graphql/', formData, {
            headers: {
                'authority': 'www.facebook.com',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
                'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
                'viewport-width': '1366',
                'content-type': 'application/json',
                'accept': '*/*',
                'origin': 'https',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https',
                'accept-language': 'vi,fr;q=0.9,en-US;q=0.8,en;q=0.7,af;q=0.6,sq;q=0.5,am;q=0.4',
                // tslint:disable-next-line:max-line-length
                'cookie': 'sb=FO6UXkZH2SUzsjMP4aZDiEex; datr=FO6UXsUyNK-Sq6dGwce-5l3v; c_user=100002893127625; _fbp=fb.1.1597753812854.189706943; wd=1366x657; spin=r.1002565699_b.trunk_t.1598361959_s.1_v.2_; xs=46%3Ara-DDyGKj13AVg%3A2%3A1586818684%3A3261%3A6319%3A%3AAcV2QEkpaUZo5oBjvnTMu96yLOc3PA3b23_w5rE5KHE; presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1598362421031%2C%22v%22%3A1%7D; fr=0v1Gwb6y5i7gtlgMt.AWWgrVzlsi0NRsbV4Xafph9tPKY.BelGnx.qH.F9F.0.0.BfRRFn.'
            }
        });
    }
}
