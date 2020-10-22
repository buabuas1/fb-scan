import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '@models/manage/product.model';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() product: ProductModel;
    constructor() {
    }

    ngOnInit() {
    }

    public onSave() {
        this.submit.emit(this.product);
    }

    public onCancel() {
        this.close.emit();
    }
}
