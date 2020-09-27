import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-area-form',
    templateUrl: './area-form.component.html',
    styleUrls: ['./area-form.component.scss']
})
export class AreaFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() areContent: any;

    constructor() {
    }

    ngOnInit() {
    }

    public onSave() {
        this.submit.emit(this.areContent);
    }

    public onCancel() {
        this.close.emit();
    }
}
