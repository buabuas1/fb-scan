import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '@models/manage/room.model';
import {ProductModel} from '@models/manage/product.model';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {ProductService} from '@core/services/product/product.service';

@Component({
    selector: 'app-product-selection',
    templateUrl: './product-selection.component.html',
    styleUrls: ['./product-selection.component.scss']
})
export class ProductSelectionComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() items: Array<ProductModel>;
    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.getProductFromApi();
    }

    private makeRoomProductGrid(): void {
        // const detailItems = this.makeDetailItem(this.room.item);
        if (this.items) {
            this.gridView = {
                data: this.items.slice(this.skip, this.skip + this.pageSize),
                total: this.items.length
            };
        }

        // this.invoice = this.invoiceService.makeInvoice(detailItems, this.room);
    }

    private getProductFromApi() {
        this.productService.getProduct()
            .subscribe(rs => {
                this.items = rs as ProductModel[];
                this.makeRoomProductGrid();
            });
    }

    onItemSelect($event: CellClickEvent) {

    }

    pageChange($event: PageChangeEvent) {

    }
}
