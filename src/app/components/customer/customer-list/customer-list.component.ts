import {Component, OnInit} from '@angular/core';
import {CellClickEvent, GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {CustomerService} from '@core/services/customer/customer.service';
import {CustomerModel} from '@models/manage/customer.model';
import {ModalService} from '@core/services/modal/modal.service';
import {ProductSelectionComponent} from '../../room/product-selection/product-selection.component';
import {CustomerFormComponent} from '../customer-form/customer-form.component';

@Component({
    selector: 'm-app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;
    private data: Array<CustomerModel> = [];
    private viewData: Array<CustomerModel> = [];

    constructor(private customerService: CustomerService,
                private modalService: ModalService) {
    }

    ngOnInit() {
        this.getDataFromApi();
    }

    public addCustomer() {
        this.createOrUpdateCustomer({} as CustomerModel);
    }

    getDataFromApi() {
        this.customerService.getCustomer()
            .subscribe(rs => {
                this.data = rs as CustomerModel[];
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

    public onItemSelect($event: CellClickEvent) {
        this.createOrUpdateCustomer($event.dataItem);
    }

    public createOrUpdateCustomer(customer: CustomerModel) {
        this.modalService.openModal({
            title: customer._id ? 'Sửa khách hàng' : 'Thêm mới khách hàng',
            component: CustomerFormComponent,
            inputs: [{key: 'customer', value: customer}],
            onSubmit: (cus) => {
                this.getDataFromApi();
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }
}
