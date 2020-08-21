import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth';
import {RouteConfigs} from '../../configs/route.configs';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
declare var FB: any;
@Component({
    selector: 'm-app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
        private auth: AuthService,
        private loggerService: LoggerServiceService
    ) {
    }

    ngOnInit() {
    }

    public logout($event: any) {
        this.auth.logout().subscribe(r => {
            this.router.navigate([RouteConfigs.loginRoute]);
        });
    }

    submitLogin() {
        console.log('submit login to facebook');
        this.loggerService.success('Success!');
        // FB.login();
        (FB as any).login((response) => {
            console.log('submitLogin', response);
            if (response.authResponse) {
                this.loggerService.success('Success!');
            } else {
                console.log('User login failed');
            }
        });
    }
}
