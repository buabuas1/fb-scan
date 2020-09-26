import {IBDSType} from '@core/services/engine/baseEngine';
import {IBDSModel} from '@models/facebook/IBDS.model';

export class ChangeHostEngine implements IBDSType {
    private regex = /sang nhượng|sang nhuong|cần nhượng lại|nhượng lại/muig;
    validateType(entity: IBDSModel): boolean {
        return this.regex.test(entity.content);
    }

}
