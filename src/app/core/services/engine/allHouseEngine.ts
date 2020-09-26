import {IBDSType} from '@core/services/engine/baseEngine';
import {IBDSModel} from '@models/facebook/IBDS.model';

export class AllHouseEngine implements IBDSType {
    private regex = /nguyên căn|cho thuê cả nhà|cả nhà/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
