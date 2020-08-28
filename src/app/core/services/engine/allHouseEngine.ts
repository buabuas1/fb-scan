import {IBDSType} from '@core/services/engine/baseEngine';

export class AllHouseEngine implements IBDSType {
    private regex = /nguyên căn/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
