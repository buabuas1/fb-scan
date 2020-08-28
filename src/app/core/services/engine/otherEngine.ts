import {IBDSType} from '@core/services/engine/baseEngine';

export class OtherEngine implements IBDSType {
    validateType(entity: IBDSModel): boolean {
        return true;
    }

}
