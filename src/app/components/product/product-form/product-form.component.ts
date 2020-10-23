import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductModel} from '@models/manage/product.model';
import {ProductService} from '@core/services/product/product.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {ProductTypes} from '../../../common/constants';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() product: ProductModel;
    public listType: any = ProductTypes;
    constructor(private productService: ProductService,
                private loggerService: LoggerServiceService) {
    }

    ngOnInit() {
    }

    public onSave() {
        this.productService.saveProduct(this.product)
            .subscribe(r => {
                this.loggerService.success('Thành công');
                this.submit.emit(this.product);
            }, error => {
                this.loggerService.error(JSON.stringify(error));
            });
    }

    public onCancel() {
        this.close.emit();
    }

    onTypeChange($event: any) {

    }
}
