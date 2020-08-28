import {IBDSType} from '@core/services/engine/baseEngine';

export class ForRentEngine implements IBDSType {
    private regex = /cho thuê|khoá vân tay|24\/7/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }
}
