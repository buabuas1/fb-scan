import {IBDSType} from '@core/services/engine/baseEngine';
import {IBDSModel} from '@models/facebook/IBDS.model';

export class OtherEngine implements IBDSType {
    validateType(entity: IBDSModel): boolean {
        return true;
    }

}
