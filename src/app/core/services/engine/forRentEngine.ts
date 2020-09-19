import {IBDSType} from '@core/services/engine/baseEngine';

export class ForRentEngine implements IBDSType {
    private regex = /cho thu|khoá vân tay|CCMN|mình có phòng|ccmn|24\/7|24\/24|còn.{0,100}phòng|giảm.{0,100}phòng/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }
}
