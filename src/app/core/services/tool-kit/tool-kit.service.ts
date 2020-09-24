import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BlackListModel} from '@models/group-manage/black-list.model';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ToolKitService {
    private host = environment.toolKit;
    private TK_KEY = 'TOOL_KIT';
    constructor(private httpClient: HttpClient, private loggerService: LoggerServiceService) {
    }

    public getPhoneByUid(uid: string) {
        const token = localStorage.getItem(this.TK_KEY);
        if (!token) {
            this.loggerService.error('Bạn chưa set token');
            return Observable.of(null);
        }
        return this.httpClient.get(this.host + `api/Convert?uid=${uid}&apikey=${token}`);
    }

    public setToolkitToken(token: string) {
        localStorage.setItem(this.TK_KEY, token);
    }
}
