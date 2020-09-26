import {IBDSType} from '@core/services/engine/baseEngine';
import {IBDSModel} from '@models/facebook/IBDS.model';

export class SecondHandEngine implements IBDSType {
    private regex = /thanh lý|thanh lí|thanh ly|thanh li/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
