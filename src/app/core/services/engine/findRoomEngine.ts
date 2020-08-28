import {IBDSType} from '@core/services/engine/baseEngine';

export class FindRoomEngine implements IBDSType {
    private regex = /Cần tìm phòng|tìm phòng|muốn thuê phòng|tìm phòg|tìm nhà|cần thuê|Cần tìm/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
