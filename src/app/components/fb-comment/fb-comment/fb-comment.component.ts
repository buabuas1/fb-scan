import {Component, EventEmitter, OnInit} from '@angular/core';
import {ModalService} from '@core/services/modal/modal.service';
import {CommentFormComponent} from '../comment-form/comment-form.component';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';
import {getFilterState} from '../../../state-management/reducers/filter.reducer';
import {GroupFbService} from '@core/services/facebook/group-fb.service';
import {BdsContentApiService} from '@core/services/bds/bds-content-api.service';
import * as moment from 'moment';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';
import {getMessageFromError} from '../../../common/util';
import {Observable} from 'rxjs/Observable';
import {SeriesClickEvent, SeriesLabels} from "@progress/kendo-angular-charts";

@Component({
    selector: 'app-fb-comment',
    templateUrl: './fb-comment.component.html',
    styleUrls: ['./fb-comment.component.scss']
})
export class FbCommentComponent implements OnInit {
    public fbLinkConst = 'https://www.facebook.com/groups';

    constructor(private modalService: ModalService, private store: Store<AppStates>,
                private groupFbService: GroupFbService,
                private bdsContentApiService: BdsContentApiService,
                private loggerService: LoggerServiceService
                ) {
    }

    public chartSeries: any[] = [{data: [1, 2, 3, 5]}];
    public chartTitle: any = {text: 'Sample Chart'};
    public chartTopGroupTitle: any = {text: 'TOP GROUP CÓ NHIỀU NGƯỜI TÌM PHÒNG NHẤT'};
    public chartTopPostTitle: any = {text: 'TOP POST CÓ NHIỀU NGƯỜI COMMENT NHẤT'};
    public groupData: any[] = [];
    public postData: any[] = [];
    public limit = 10;
    public filter = {
        postTime: moment(new Date().setHours(0, 0, 0, 0)).add(-1, 'months').toDate()
    };
    public $limitChange = new EventEmitter<number>();
    public dateOptions: kendo.ui.DateTimePickerOptions = {
        format: 'dd/MM/yyyy HH:mm',
    };

    public markPostOnclick = false;

    ngOnInit() {
        this.getDataFromApi();
        this.$limitChange
            .debounceTime(500)
            .subscribe(r => {
                this.getDataFromApi();
            });
    }
    getDataFromApi() {
        this.bdsContentApiService.getFindRoomChart(this.filter.postTime, this.limit)
            .subscribe(rs => {
                this.groupData = rs as any[];
                this.groupData = this.groupData.map((g, ind) => {
                    g.color = this.getRandomColor();
                    return g;
                });
            }, error => {
                this.loggerService.error(getMessageFromError(error));
            });

        this.bdsContentApiService.getTopPostChart(this.filter.postTime, this.limit)
            .subscribe(rs => {
                this.postData = rs as any[];
                this.postData = this.postData.map((g, ind) => {
                    g.color = this.getRandomColor();
                    return g;
                });
            }, error => {
                this.loggerService.error(getMessageFromError(error));
            });
    }
    open() {
        this.modalService.openModal({
            title: 'Thu học phí',
            component: CommentFormComponent,
            // isCustomModalHeader: true,
            inputs: [{key: 'studentOrder', value: {}}],
            onSubmit: () => {
            }
        }, {class: 'modal-lg modal-title-status 9', backdrop: 'static'});
        this.store.select(getFilterState)
            .subscribe(rs => console.log(rs));
        this.groupFbService.getFeedOfGroup('2')
            .subscribe(rs => console.log(rs));
    }

    public getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    onChartItemClick(event: any) {
        const fbLink = this.makeFbLinkGroup(event.category);
        this.changeColor(event.category, false);
        window.open(fbLink, '_blank');
    }

    private changeColor(category: any, isPost: boolean) {
        if (isPost) {
            this.postData = this.postData.map((g, ind) => {
                if (g && g.id === category) {
                    g.color = '#000';
                }
                return g;
            });
            return;
        }
        this.groupData = this.groupData.map((g, ind) => {
            if (g && g._id === category) {
                g.color = '#000';
            }
            return g;
        });
    }

    private makeFbLinkGroup(category: any) {
        return `${this.fbLinkConst}/${category}`;
    }

    onDateChange($event: Date, b: boolean) {
        this.filter.postTime = $event;
        this.getDataFromApi();
    }

    async onChartCommentItemClick($event: SeriesClickEvent) {
        const item = this.postData.find(p => p.id === $event.category);
        this.changeColor($event.category, true);
        if (this.markPostOnclick) {
            try {
                await this.bdsContentApiService.markPostIsCommented(item, true).toPromise();
                this.loggerService.success('Marked');
            } catch (e) {
                console.log(e);
            }
        }
        window.open(item.url, '_blank');
    }

    public getLabelContent = (e: any) => {
        return this.groupData ? `${this.groupData.findIndex(g => g._id === e.category) + 1}` : '';
    }

    public getLabelContentPost = (e: any) => {
        if (!this.postData) {
            return ;
        }
        const index = this.postData.findIndex(g => g.id === e.category) + 1;
        const item = this.postData.find(g => g.id === e.category);
        return `${index} ${item.isCommented ? '✓' : ''}`;
    }

}
