import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {BdsContentApiService} from '@core/services/bds/bds-content-api.service';
import {ModalService} from '@core/services/modal/modal.service';
import {IConfirmOptions} from '../../../../common/confirm/confirm.component';
import {AreaFormComponent} from '../area-form/area-form.component';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

@Component({
    selector: 'app-area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();
    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;
    private data: Array<any> = [];

    constructor(private bdsContentApiService: BdsContentApiService,
                private modalService: ModalService,
                private loggerService: LoggerServiceService) {
    }

    ngOnInit() {
        this.bdsContentApiService.getArea()
            .subscribe(rs => {
                this.data = rs as any[];
                this.loadItems();
            });
    }

    public pageChange(event: PageChangeEvent): void {
        this.skip = event.skip;
        this.loadItems();
    }

    private loadItems(): void {
        this.gridView = {
            data: this.data.slice(this.skip, this.skip + this.pageSize),
            total: this.data.length
        };
    }

    public onUpdate(dataItem) {
        this.modalService.openModal({
            title: 'Sửa danh sách từ khóa theo khu vực',
            component: AreaFormComponent,
            // isCustomModalHeader: true,
            inputs: [{key: 'areContent', value: dataItem}],
            onSubmit: (area) => {
                this.bdsContentApiService.saveArea(area)
                    .subscribe(a => {
                        this.loggerService.success('Thành công!');
                        this.refreshArea();
                    });
            },
            onModalClose: () => {

            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
    }

    public onDelete(dataItem) {
        this.modalService.confirm(<IConfirmOptions>{
            title: `Thông báo`,
            message: 'Bạn có chắc muốn xóa?',
        }).subscribe(async confirmed => {
            if (confirmed) {
                this.bdsContentApiService.deleteArea(dataItem)
                    .subscribe(_ => {
                        this.refreshArea();
                    });
            }
        });
    }

    private refreshArea() {
        this.bdsContentApiService.getArea()
            .subscribe(rs => {
                this.data = rs as any[];
            });
    }
}
