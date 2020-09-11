import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {BlackListModel} from '@models/group-manage/black-list.model';
import {HttpClient} from '@angular/common/http';
import {UserFriendModel} from '@models/group-manage/user-friend.model';
import {GroupUserModel} from '@models/group-manage/group-user.model';

@Injectable()
export class GroupManageApiService {
    private host = environment.beHost;

    constructor(private httpClient: HttpClient) {
    }

    public saveBlackListUser(user: Array<BlackListModel>) {
        return this.httpClient.post(this.host + 'api/blacklist/bulk', {data: user});
    }
    public getBlackListUser() {
        return this.httpClient.get(this.host + 'api/blacklist');
    }

    public saveUserFriend(user: Array<UserFriendModel>) {
        return this.httpClient.post(this.host + 'api/user/friend/bulk', {data: user});
    }
    public getUserFriend() {
        return this.httpClient.get(this.host + 'api/user/friend');
    }

    public saveGroupUser(user: Array<GroupUserModel>) {
        return this.httpClient.post(this.host + 'api/group/user/bulk', {data: user});
    }
    public getGroupUser() {
        return this.httpClient.get(this.host + 'api/group/user');
    }
}
