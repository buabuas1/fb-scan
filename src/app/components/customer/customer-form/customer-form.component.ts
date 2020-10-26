import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoomModel} from '@models/manage/room.model';
import {CustomerModel} from '@models/manage/customer.model';
import {CustomerService} from '@core/services/customer/customer.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    @Input() customer: CustomerModel;

    constructor(private customerService: CustomerService,
                private loggerService: LoggerServiceService) {
    }

    ngOnInit() {
    }

    public onSave() {
        this.customerService.saveCustomer(this.customer)
            .subscribe(rs => {
                this.loggerService.success('Thành công');
                this.submit.next();
            }, error => {
               this.loggerService.error(JSON.stringify(error));
            });
    }

    public onCancel() {
        this.close.next();
    }
}
