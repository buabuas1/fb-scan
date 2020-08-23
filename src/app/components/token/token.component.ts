import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppStates} from '../../state-management/app-state';
import {CellClickEvent} from '@progress/kendo-angular-grid';
import {TokenModel} from '@models/facebook/token.model';
import {getFbAuthToken} from '../../state-management/reducers/fb-auth.reducer';
import {
    FbAuthActionAddAction,
    FbAuthActionRemoveAction, FbAuthUpdateTokenAction,
    FbAutSetListTokenAction
} from '../../state-management/actions/fb-auth.action';
import {ModalService} from '@core/services/modal/modal.service';
import {TokenFormComponent} from './token-form/token-form.component';

@Component({
    selector: 'app-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
    public tokens: Array<TokenModel> = [];
    private tokenLCKey = 'tokensFB';
    constructor(
        private store: Store<AppStates>,
        private modalService: ModalService
    ) {
    }

    ngOnInit() {
        this.tokens = JSON.parse(localStorage.getItem(this.tokenLCKey));
        this.store.dispatch(new FbAutSetListTokenAction(this.tokens || []));
        this.store.select(getFbAuthToken)
            .subscribe(rs => {
                this.tokens = rs;
                this.saveToLocal(rs);
            });
    }

    onOpenDetail($event: CellClickEvent) {
        this.modalService.openModal({
            title: 'Thu học phí',
            component: TokenFormComponent,
            // isCustomModalHeader: true,
            inputs: [{key: 'token', value: $event.dataItem}],
            onSubmit: (token) => {
                this.store.dispatch(new FbAuthUpdateTokenAction(token));
            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }

    private saveToLocal(tokens: Array<TokenModel>) {
        localStorage['tokensFB'] = JSON.stringify(tokens);
    }

    public DeleteToken(dataItem) {
        this.store.dispatch(new FbAuthActionRemoveAction(dataItem));
    }
}
