import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BlackListModel} from '@models/group-manage/black-list.model';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ToolKitService {
    private host = environment.beHost;
    constructor(private httpClient: HttpClient, private loggerService: LoggerServiceService) {
    }

    public getPhoneByUid(uid: string): Observable<any> {
        return this.httpClient.get(this.host + `api/group/user/phone?uid=${uid}`);
    }

}
