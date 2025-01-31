import {ICost} from '@core/services/engine/baseEngine';
import {removeVietnameseTones} from '../../../common/util';
import {IBDSModel} from '@models/facebook/IBDS.model';

export class CostEngine implements ICost {
    private regex = /([\d]{1,3}([,.][\d]{1,2})?( )?t(r)?[\d]?)|(\d+(\.\d+)+)/gmiu;
    private regexTrash = /t[^r \d \W]|tr[^i\d \W]/gmiu;
    private stringMoney = '000.000';
    getCosts(entity: IBDSModel): any[] {
        let m;
        const cost = [];
        const content = entity.content ? removeVietnameseTones(entity.content)
            .replace(this.regexTrash, '').toLowerCase() : entity.content;
        while ((m = this.regex.exec(content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === this.regex.lastIndex) {
                this.regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            if (m[0] && m[0].toLowerCase().indexOf('t') !== -1) {
                cost.push(m[0].toLowerCase());
            }

            if (m[0] && m[0].toLowerCase().indexOf(this.stringMoney) !== -1) {
                cost.push(m[0].toLowerCase().split(this.stringMoney)[0] + 't');
            }
        }
        return cost;
    }

}
