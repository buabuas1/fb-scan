import {IBDSType} from '@core/services/engine/baseEngine';
import {IBDSModel} from '@models/facebook/IBDS.model';

export class OfficeEngine implements IBDSType {
    private regex = /cho thuê|khoá vân tay|24\/7/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
