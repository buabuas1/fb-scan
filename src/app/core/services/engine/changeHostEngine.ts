import {IBDSType} from '@core/services/engine/baseEngine';

export class ChangeHostEngine implements IBDSType {
    private regex = /sang nhượng|sang nhuong/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
