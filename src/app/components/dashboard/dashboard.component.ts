import {Component, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process} from '@progress/kendo-data-query';

@Component({
    selector: 'm-app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public file: any;
    private data = [];

    gridData = [];
    pagination = {
        currentPage: 0,
        skip: 0,
        pageSize: 5
    };
    public gridView: GridDataResult;
    public pageSize = 5;
    public skip = 0;

    public aggregates: any[] = [{field: 'UnitPrice', aggregate: 'sum'}];

    // public group: any[] = [];

    public dataExport: any[] = [];

    public total: any = aggregateBy(this.data, this.aggregates);
    constructor() {
    }

    ngOnInit() {
    }

    login() {
        (window as any).abc();
    }

    export(data) {

    }

    fileChanged($event: any) {
        this.file = $event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            console.log(fileReader.result);
            const a = fileReader.result;
            this.data = JSON.parse(a);
            this.data = this.data.filter(r => r.contentTypes && r.contentTypes.indexOf('TIM_PHONG') >= 0);
            console.log(this.data);
            this.export(this.data);
            this.data = this.data.map(m => {
                m.postTimeView = new Date(m.postTime);
                m.costsView = m.costs.join('-');
                return m;
            });
            this.dataExport = process(this.data, {
                // group: this.group
            }).data;
            this.loadItems();
        };
        fileReader.readAsText(this.file);
    }

    deleteFile() {
        this.file = null;
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
}
