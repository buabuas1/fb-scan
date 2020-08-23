import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenModel} from "@models/facebook/token.model";

@Component({
    selector: 'app-token-form',
    templateUrl: './token-form.component.html',
    styleUrls: ['./token-form.component.scss']
})
export class TokenFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() token: TokenModel;
    constructor() {
    }

    ngOnInit() {
    }

    saveToken() {
        this.submit.emit(this.token);
    }

    cancel() {
        this.close.next();
    }
}
