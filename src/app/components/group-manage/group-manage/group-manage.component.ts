import {Component, OnInit} from '@angular/core';
import {GroupManageApiService} from '@core/services/group-manage/group-manage-api.service';
import {BlackListModel} from '@models/group-manage/black-list.model';
import {UserFriendModel} from '@models/group-manage/user-friend.model';
import {getMessageFromError, removeSpace} from '../../../common/util';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

@Component({
    selector: 'app-group-manage',
    templateUrl: './group-manage.component.html',
    styleUrls: ['./group-manage.component.scss']
})
export class GroupManageComponent implements OnInit {
    public blacklist: any;
    public userFriend: any;
    public userGroup: any;
    public blackListData: Array<BlackListModel> = [];
    public blackListDataStr = '';
    public userFriendData: UserFriendModel[] = [];
    public userFriendDataStr = '';
    public blackListDataDate = '';
    public userFriendDataDate = '';

    constructor(
        private groupManageApiService: GroupManageApiService,
        private loggerService: LoggerServiceService
    ) {
    }

    public async ngOnInit() {
        await this.getBlackList();
        await this.getUserFriend();
    }

    public async getBlackList() {
        this.blackListData = await this.groupManageApiService.getBlackListUser().toPromise() as BlackListModel[];
        this.blackListDataStr = this.blackListData.map(r => r.userId).join(',');
        this.blackListDataDate += this.blackListDataStr ?
            `ModifiedDate: ${new Date(this.blackListData[0].modifiedDate).toLocaleString()}` : '';
    }

    public async getUserFriend() {
        this.userFriendData = await this.groupManageApiService.getUserFriend().toPromise() as UserFriendModel[];
        this.userFriendDataStr = this.userFriendData.map(r => r.userId).join(',');
        this.userFriendDataDate += this.userFriendDataStr ?
            `ModifiedDate: ${new Date(this.userFriendData[0].modifiedDate).toLocaleString()}` : '';
    }

    public saveBlackList() {
        const data = removeSpace(this.blacklist).split(',').map(r => {
            const d = new BlackListModel();
            d.userId = r;
            return d;
        });
        this.groupManageApiService.saveBlackListUser(data)
            .subscribe(_ => {
                this.loggerService.success('Lưu thành công!');
            }, error => this.loggerService.error(getMessageFromError(error)));
    }

    public saveUserFriend() {

    }

    public saveGroupUser() {

    }
}
