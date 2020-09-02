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

@Component({
    selector: 'app-fb-comment',
    templateUrl: './fb-comment.component.html',
    styleUrls: ['./fb-comment.component.scss']
})
export class FbCommentComponent implements OnInit {

    constructor(private modalService: ModalService, private store: Store<AppStates>,
                private groupFbService: GroupFbService,
                private bdsContentApiService: BdsContentApiService,
                private loggerService: LoggerServiceService
                ) {
    }

    public chartSeries: any[] = [{data: [1, 2, 3, 5]}];
    public chartTitle: any = {text: 'Sample Chart'};
    public chartTopGroupTitle: any = {text: 'TOP GROUP CÓ NHIỀU NGƯỜI TÌM PHÒNG NHẤT'};
    public groupData: any[] = [];
    public limit = 10;
    public filter = {
        postTime: moment(new Date().setHours(0, 0, 0, 0)).add(-1, 'months').toDate()
    };
    public $limitChange = new EventEmitter<number>();
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
                this.groupData = this.groupData.map(g => {
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
}
