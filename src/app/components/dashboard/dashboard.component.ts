import {Component, OnInit} from '@angular/core';
import {GridDataResult, PageChangeEvent} from '@progress/kendo-angular-grid';
import {aggregateBy, process} from '@progress/kendo-data-query';
import * as moment from 'moment';
import {BdsType, BdsTypeArray, MAX_DBS_PRICE, MID_DBS_PRICE} from '../../common/constants';
import * as R from 'ramda';
import {DecimalPipe} from '@angular/common';
import {GroupFbService} from '@core/services/facebook/group-fb.service';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {GroupFeedModel} from '@models/facebook/group-feed.model';
import {BdsTypeService} from '@core/services/bds/bds-type.service';
import {CommentModel} from '@models/facebook/comment.model';
import {BdsContentApiService} from '@core/services/bds/bds-content-api.service';
import {BdsMongoModel} from '@models/facebook/bds-mongo.model';
import {AuthService} from '@core/services/auth';
import {getIdFromErrorMessage, getMessageFromError} from '../../common/util';

@Component({
    selector: 'm-app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public file: any;
    private data: Array<IBDSModel> = [];
    private viewData: Array<IBDSModel> = [];

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
        from: moment(new Date().setHours(0, 0, 0, 0)).add(-1, 'day').toDate(),
        to: new Date(),
        bdsType: [BdsTypeArray[1]], // TIM_PHONG
        typePrice: 'all',
        priceFrom: 0,
        priceTo: 100000000,
        searchText: '',
        groupIds: ''
    };
    public listItemsPrice = [];
    public dateOptions: kendo.ui.DateTimePickerOptions = {
        format: 'dd/MM/yyyy HH:mm',
    };

    constructor(private decimalPipe: DecimalPipe,
                private groupFbService: GroupFbService,
                private loggerService: LoggerServiceService,
                private bdsTypeService: BdsTypeService,
                private bdsContentApiService: BdsContentApiService,
                public authService: AuthService
                ) {
    }

    ngOnInit() {
        this.makePriceDropDown();
        this.getDataFromApi();
    }

    getDataFromApi() {
        this.bdsContentApiService.getFbContent(this.model.from, this.model.groupIds)
            .subscribe(rs => {
                this.data = rs as IBDSModel[];
                this.initData();
            });
    }

    initData(isFilter: boolean = true)  {
        this.data = this.bdsTypeService.convertData(this.data);
        if (isFilter) {
            this.updateFilter();
        }
        this.loadItems();
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
            const a = fileReader.result;
            this.data = JSON.parse(a);
            // this.data = this.bdsTypeService.convertData(this.data);
            // this.updateFilter();
            // this.loadItems();
            this.initData();
        };
        fileReader.readAsText(this.file);
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
        this.dataExport = process(this.viewData, {
            // group: this.group
        }).data;
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
        // this.bdsContentApiService.getFbContent(this.model.from)
        //     .subscribe(rs => {
        //         this.data = rs as IBDSModel[];
        //         this.initData();
        //     });
        this.getDataFromApi();
        // this.updateFilter();
    }

    public updateFilter() {
        // date
        this.viewData = this.data;
        if (this.model.typeDate === 'spec') {
            this.viewData =
                this.viewData.filter(d => d.postTime > this.model.from.getTime() && d.postTime < this.model.to.getTime());
        }
        // type
        if (this.model.bdsType && this.model.bdsType.length > 0) {
            this.viewData = this.viewData
                .filter(r => R.any(f => r.contentTypes && r.contentTypes.indexOf(f.key) >= 0, this.model.bdsType));
        }
        // price
        if (this.model.typePrice === 'spec' && this.model.priceFrom >= 0) {
            this.viewData =
                this.viewData.filter(d => R.any(nc => nc >= this.model.priceFrom, d.numberCosts || []));
        }
        if (this.model.typePrice === 'spec' && this.model.priceTo >= 0) {
            this.viewData =
                this.viewData.filter(d => R.any(nc => nc <= this.model.priceTo, d.numberCosts || []));
        }
        // search text
        if (this.model.searchText) {
            this.viewData =
                this.viewData.filter(v => v.content.indexOf(this.model.searchText) >= 0);
        }
        this.skip = 0;
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

    onPriceChange($event: any) {
        this.updateFilter();
    }

    public getFeed() {
        this.groupFbService.getFeedOfGroup('1723212891281598')
            .subscribe(rs => {
                    console.log('feed', rs);
                    this.loggerService.success('Token đang hoạt động');
                },
                error => {
                    console.log('get feed error', error);
                    this.loggerService.error('Token không hoạt động');
                });
    }

    public postComment() {
        this.groupFbService.postGroupComment('3219247554857348', {
            message: 'Good',
            attachment_url: 'https://live.staticflickr.com/65535/49976872231_9dc20f7be7_w.jpg'
        })
            .subscribe(rs => {
                console.log('post rs ', rs);
                this.loggerService.success('Posted');
            }, error => {
                console.log('post error ', error);
                this.loggerService.error('Post unsuccessfully');
            });
    }

    public postContent() {
        this.groupFbService.postGroupContent('2295575987153701',
            {
                imageUrls: [
                    'https://live.staticflickr.com/65535/49976872231_9dc20f7be7_w.jpg',
                    'https://www.facebook.com/images/fb_icon_325x325.png'
                ],
                message: 'SAY HELLO'
            }).subscribe(rs => {
                this.loggerService.success('Posted');
        }, error => {
                this.loggerService.error('Lỗi ', error);
        });
    }

    public callFb() {
    }

    fileChangedMultiple($event: any) {
        const file = $event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const a = fileReader.result;
            const b = a.split('\n');
            b.forEach(c => {
               const f = JSON.parse(c);
            });
            const content = JSON.parse(b[0]);
            let feeds: Array<any> = content.data && content.data.group && content.data.group.group_feed &&
                content.data.group.group_feed.edges || [];
            if (!feeds || (feeds && feeds.length === 0)) {
                this.loggerService.error('Không có thông tin bài viết!');
            } else {
                feeds = this.bdsTypeService.removeUnusedContent(feeds);
                feeds.splice(0, 1); // delete first element unused;
                // get Post content
                let postContent: Array<IBDSModel> = feeds.map(fe => {
                    return new GroupFeedModel(fe) as IBDSModel;
                });
                // get Comment content
                let commentContent: Array<IBDSModel> = [];
                commentContent = this.bdsTypeService.getCommentFromFeeds(feeds);
                postContent = postContent.concat(commentContent);
                this.data = postContent.filter(c => c.url && c.content);
                this.data = this.classify(this.data);
                // this.data = this.bdsTypeService.convertData(this.data);
                // this.updateFilter();
                // this.loadItems();
                this.initData();
            }
        };
        fileReader.readAsText(file);
    }

    private classify(data: any[]) {
        return this.bdsTypeService.classifyBDSType(data);
    }

    saveToDB() {
        console.log(this.viewData);
        const save = this.viewData.map(v => {
            return new BdsMongoModel(v);
        });
        this.bdsContentApiService.saveFbContent(save)
            .subscribe(rs => {
                this.loggerService.success(`${rs.toString()} ${save.length}`);
            }, async error => {
                await this.handleError(save, error);
            });
    }

    private async handleError(save: any, error: any) {
        this.loggerService.error(getMessageFromError(error));
        let dupId = getIdFromErrorMessage(getMessageFromError(error));
        save = save.filter(s => s.id !== dupId);
        const length = save.length;
        for (let i = 0; i < length; i++) {
            if (save && save.length > 0) {
                try {
                    await this.bdsContentApiService.saveFbContent(save)
                        .toPromise();
                    this.loggerService.success(`Thành công ${save.length}`);
                    break;
                } catch (e) {
                    dupId = getIdFromErrorMessage(getMessageFromError(e));
                    save = save.filter(s => s.id !== dupId);
                    console.log('duplicate key ', dupId);
                }
            }
        }
    }

    public reClassify() {
        this.data = this.classify(this.data);
        // this.data = this.bdsTypeService.convertData(this.data);
        // this.updateFilter();
        // this.loadItems();moment
        this.initData(false);
    }

    updateGroupFilter($event) {
        this.getDataFromApi();
    }
}
