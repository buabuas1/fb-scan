import {Component, OnInit} from '@angular/core';
import {ProductService} from '@core/services/product/product.service';
import {ModalService} from '@core/services/modal/modal.service';
import {ProductSelectionComponent} from '../../room/product-selection/product-selection.component';
import {ProductFormComponent} from '../product-form/product-form.component';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    constructor(private productService: ProductService,
                private modalService: ModalService,
                private loggerService: LoggerServiceService
                ) {
    }

    ngOnInit() {
    }

    public onAddProduct() {
        this.modalService.openModal({
            title: 'Thêm hàng',
            component: ProductFormComponent,
            inputs: [{key: 'room', value: {}}],
            onSubmit: (product) => {
                this.productService.saveProduct(product)
                    .subscribe(r => {
                        this.loggerService.success('Thành công');
                    }, error => {
                        this.loggerService.error(JSON.stringify(error));
                    });
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }
}
