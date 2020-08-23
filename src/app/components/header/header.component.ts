import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '@core/services/auth';
import {RouteConfigs} from '../../configs/route.configs';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {Store} from "@ngrx/store";
import {AppStates} from "../../state-management/app-state";
import {FbAuthActionAddAction} from "../../state-management/actions/fb-auth.action";
declare var FB: any;
@Component({
    selector: 'm-app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(
        private router: Router,
        public auth: AuthService,
        private loggerService: LoggerServiceService,
        protected store: Store<AppStates>
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
        (FB as any).login((response) => {
            if (response.authResponse) {
                this.loggerService.success('Success!');
                this.store.dispatch(new FbAuthActionAddAction(response.authResponse));
            } else {
                console.log('User login failed');
            }
        });
    }
}
