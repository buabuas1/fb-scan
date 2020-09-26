import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth';
import {RouteConfigs} from '../../configs/route.configs';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {getMessageFromError} from '../../common/util';

@Component({
    selector: 'm-app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

    public name: string;
    public password: string;
    public isLoginInProgress: boolean;
    public errorMessage: string;

    @ViewChild('authForm') currentForm: NgForm;

    constructor(
        private router: Router,
        private auth: AuthService,
        private loggerService: LoggerServiceService
    ) {
    }

    public onSubmit(authForm: any) {

        if (this.currentForm && this.currentForm.valid) {

            this.auth.login(this.name, this.password)
                .subscribe(r => {
                        this.router.navigate([RouteConfigs.appRoute]);
                    },
                    err => {
                        this.errorMessage = getMessageFromError(err);
                        // this.isLoginInProgress = false;
                        this.loggerService.error(getMessageFromError(err));
                    }
                );
        }
    }
}
