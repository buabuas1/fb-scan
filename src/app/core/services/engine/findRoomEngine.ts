import {IBDSType} from '@core/services/engine/baseEngine';
import {IBDSModel} from '@models/facebook/IBDS.model';

export class FindRoomEngine implements IBDSType {
    private regex = /Cần tìm phòng|tìm phòng|muốn thuê phòng|tìm phòg|tìm nhà|cần thuê|Cần tìm|tìm trọ/muig;
    private negativeRegex = /24\/7|24\/24|bên mình còn/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content) && !this.negativeRegex.test(entity.content);
    }

}
