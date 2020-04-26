import {Component, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process} from '@progress/kendo-data-query';
import * as moment from 'moment';
import {BdsType, BdsTypeArray, MAX_DBS_PRICE, MID_DBS_PRICE} from '../../common/constants';
import * as R from 'ramda';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'm-app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public file: any;
    private data = [];
    private viewData = [];

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

    public total: any = aggregateBy(this.viewData, this.aggregates);
    public listItems = BdsTypeArray;
    model: any = {
        typeDate: 'all',
        from: moment(new Date().setHours(0, 0, 0, 0)).toDate(),
        to: new Date(),
        bdsType: [BdsTypeArray[1]], // TIM_PHONG
        typePrice: 'all',
        priceFrom: 0,
        priceTo: 100000000
    };
    public listItemsPrice = [];
    public dateOptions: kendo.ui.DateTimePickerOptions = {
        format: 'dd/MM/yyyy HH:mm',
    };
    constructor(private decimalPipe: DecimalPipe) {
    }

    ngOnInit() {
        this.makePriceDropDown();
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
            this.data = this.data.map(m => {
                m.postTimeView = new Date(m.postTime);
                m.costsView = m.costs.join('-');
                return m;
            });
            this.data = this.convertData(this.data);
            this.dataExport = process(this.viewData, {
                // group: this.group
            }).data;
            this.updateFilter();
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
            data: this.viewData.slice(this.skip, this.skip + this.pageSize),
            total: this.viewData.length
        };
    }

    changeViewType(raise: string) {
        // this.model.typeDate = raise;
        this.updateFilter();
    }

    onDateChange($event: any, isFrom: boolean) {
        if (isFrom) {
            this.model.from = $event;
        } else {
            this.model.to = $event;
        }
        this.updateFilter();
    }

    updateFilter() {
        // date
        this.viewData = this.data;
        if (this.model.typeDate === 'spec') {
            this.viewData =
                this.viewData.filter(d => d.postTime > this.model.from.getTime() && d.postTime.getTime() < this.model.to);
        }
        // type
        if (this.model.bdsType) {
            this.viewData = this.viewData
                .filter(r => R.any(f => r.contentTypes && r.contentTypes.indexOf(f.key) >= 0, this.model.bdsType));
        }
        // price
        if (this.model.typePrice === 'spec' && this.model.priceFrom >= 0) {
            this.viewData =
                this.viewData.filter(d => R.any(nc => nc > this.model.priceFrom, d.numberCosts || []));
        }
        if (this.model.typePrice === 'spec' && this.model.priceTo >= 0) {
            this.viewData =
                this.viewData.filter(d => R.any(nc => nc <= this.model.priceTo, d.numberCosts || []));
        }
        this.loadItems();
    }

    onBdsTypeChange($event: any[]) {
        this.updateFilter();
    }

    changeViewPriceType(all: string) {
        this.updateFilter();
    }

    private makePriceDropDown() {
        for (let i = 0; i < MID_DBS_PRICE; i = i + 500000) {
            this.listItemsPrice.push({
                id: i,
                value: this.decimalPipe.transform(i, '1.0')
            });
        }
        for (let i = MID_DBS_PRICE; i <= MAX_DBS_PRICE; i = i + 10000000) {
            this.listItemsPrice.push({
                id: i,
                value: this.decimalPipe.transform(i, '1.0')
            });
        }
    }

    makeValueFromString(values: [any]) {
        const rsArr = [];
        try {
            values.forEach(valueStr => {
                let result = 0;
                const arrDecimal = valueStr.split('tr');
                result = parseFloat(arrDecimal[0].replace(',', '.')) * 1000000; // * 1tr
                if (arrDecimal.length === 2 && !isNaN(parseFloat('0.' + arrDecimal[1]))) {
                    result += parseFloat('0.' + arrDecimal[1]) * 1000000; // * 100 ng
                }
                rsArr.push(result);
            });
            return rsArr;
        } catch (e) {
            alert('Không thể convert string to number: ' + values);
        }

    }

    private convertData(data: any[]) {
        // convert price string to number
        data.forEach(value => {
            if (value && value.costs && value.costs.length > 0) {
                value.numberCosts = this.makeValueFromString(value.costs);
            }
        });
        return data;
    }

    onPriceChange($event: any) {
        this.updateFilter();
    }
}
