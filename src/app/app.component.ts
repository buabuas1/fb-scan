import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@core/services/auth';
import {getMessageFromError} from './common/util';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {vnCultures} from './common/constants';
import {Store} from '@ngrx/store';
import {AppStates} from './state-management/app-state';
import {getIsShowSpinner} from './state-management/reducers/filter.reducer';

@Component({
  selector: 'm-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    public isShowSpinner = false;
    constructor(vcr: ViewContainerRef,
                private authService: AuthService, private loggerService: LoggerServiceService, private store: Store<AppStates>) {
    }
    ngOnInit(): void {
        this.authService.getCurrentSession().subscribe(rs => {
            console.log('refresh');
        }, error => {
            this.loggerService.error(getMessageFromError(error));
        });
        this.setCustomKendoCulture();
        this.store.select(getIsShowSpinner)
            .subscribe(rs => {
                this.isShowSpinner = rs;
            });
    }

    private setCustomKendoCulture() {
        if (kendo && kendo.cultures) {
            kendo.cultures['vi-VN'] = vnCultures as any;
            kendo.culture('vi-VN');
        }
    }
}
