import {Component, OnInit, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@core/services/auth';
import {getMessageFromError} from './common/util';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {vnCultures} from './common/constants';

@Component({
  selector: 'm-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    constructor(vcr: ViewContainerRef,
                private authService: AuthService, private loggerService: LoggerServiceService) {
    }
    ngOnInit(): void {
        this.authService.getCurrentSession().subscribe(rs => {
            console.log('refresh');
        }, error => {
            this.loggerService.error(getMessageFromError(error));
        });
        this.setCustomKendoCulture();
    }

    private setCustomKendoCulture() {
        if (kendo && kendo.cultures) {
            kendo.cultures['vi-VN'] = vnCultures as any;
            kendo.culture('vi-VN');
        }
    }
}
