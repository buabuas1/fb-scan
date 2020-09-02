import {IBDSType} from '@core/services/engine/baseEngine';

export class ForRentEngine implements IBDSType {
    private regex = /cho thu|khoá vân tay|24\/7|còn.{0,100}phòng|giảm.{0,100}phòng/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }
}
