import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '@models/manage/room.model';
import {ProductModel} from '@models/manage/product.model';
import {
    CellClickEvent,
    DataStateChangeEvent,
    GridDataResult,
    PageChangeEvent,
    SelectAllCheckboxState
} from '@progress/kendo-angular-grid';
import {ProductService} from '@core/services/product/product.service';
import {process, State} from '@progress/kendo-data-query';

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
    public mySelection: string[] = [];
    public selectAllState: SelectAllCheckboxState = 'unchecked';
    public state: State = {
        skip: 0,
        take: 5,

        // Initial filter descriptor
        filter: {
            logic: 'and',
            filters: [{ field: 'name', operator: 'contains', value: '' }]
        }
    };

    constructor(private productService: ProductService) {
    }

    ngOnInit() {
        this.mySelection = this.items ? this.items.map(i => i._id) : [];
        this.getProductFromApi();
    }

    // private makeRoomProductGrid(): void {
    //     // const detailItems = this.makeDetailItem(this.room.item);
    //     if (this.items) {
    //         this.gridView = {
    //             data: this.items.slice(this.state.skip, this.state.take),
    //             total: this.items.length
    //         };
    //     }
    //
    //     // this.invoice = this.invoiceService.makeInvoice(detailItems, this.room);
    // }

    private getProductFromApi() {
        this.productService.getProduct()
            .subscribe(rs => {
                this.items = rs as ProductModel[];
                // this.makeRoomProductGrid();
                this.loadItems();
            });
    }

    onItemSelect($event: CellClickEvent) {

    }


    public onSelectedKeysChange(e) {
        const len = this.mySelection.length;

        if (len === 0) {
            this.selectAllState = 'unchecked';
        } else if (len > 0 && len < this.items.length) {
            this.selectAllState = 'indeterminate';
        } else {
            this.selectAllState = 'checked';
        }
    }

    public onSelectAllChange(checkedState: SelectAllCheckboxState) {
        if (checkedState === 'checked') {
            this.mySelection = this.items.map((item) => item._id);
            this.selectAllState = 'checked';
        } else {
            this.mySelection = [];
            this.selectAllState = 'unchecked';
        }
    }

    public pageChange(event: PageChangeEvent): void {
        this.state.skip = event.skip;
        this.loadItems();
    }

    private loadItems(): void {
        this.gridView = process(this.items, this.state);
    }

    public onProduct() {
        this.submit.emit(this.items.filter(i => this.mySelection.indexOf(i._id) !== -1));
    }

    public onCancel() {
        this.close.emit();
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.gridView = process(this.items, this.state);
    }
}
