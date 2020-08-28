import {IBDSType} from '@core/services/engine/baseEngine';

export class SecondHandEngine implements IBDSType {
    private regex = /thanh lý|thanh lí|thanh ly|thanh li/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
