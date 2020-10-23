import {Component, OnInit} from '@angular/core';
import {ProductService} from '@core/services/product/product.service';
import {ModalService} from '@core/services/modal/modal.service';
import {ProductSelectionComponent} from '../../room/product-selection/product-selection.component';
import {ProductFormComponent} from '../product-form/product-form.component';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {CellClickEvent, GridDataResult, PageChangeEvent, SelectAllCheckboxState} from '@progress/kendo-angular-grid';
import {RoomModel} from '@models/manage/room.model';
import {ProductModel} from '@models/manage/product.model';
import {ProductTypes} from '../../../common/constants';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;
    private data: Array<ProductModel> = [];
    private viewData: Array<ProductModel> = [];

    constructor(private productService: ProductService,
                private modalService: ModalService,
                private loggerService: LoggerServiceService
    ) {
    }

    ngOnInit() {
        this.getDateFromApi();
    }

    public getDateFromApi() {
        this.productService.getProduct()
            .subscribe(rs => {
                this.data = rs as ProductModel[];
                this.viewData = this.data;
                this.initData();
            });
    }
    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadItems();
    }

    private loadItems(): void {
        this.gridView = {
            data: this.viewData.slice(this.skip, this.skip + this.pageSize),
            total: this.viewData.length
        };
    }

    private initData() {
        this.loadItems();
    }

    public onAddProduct() {
        this.modalService.openModal({
            title: 'Thêm hàng',
            component: ProductFormComponent,
            inputs: [{key: 'product', value: {}}],
            onSubmit: (product) => {
                this.getDateFromApi();
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }

    public onItemSelect($event: CellClickEvent) {
        this.modalService.openModal({
            title: 'Sửa hàng',
            component: ProductFormComponent,
            inputs: [{key: 'product', value: $event.dataItem}],
            onSubmit: (product) => {
                this.getDateFromApi();
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }

    public getType(type: number) {
        return ProductTypes.find(i => i._id === type) ?
            ProductTypes.find(i => i._id === type).name : '';
    }
}
