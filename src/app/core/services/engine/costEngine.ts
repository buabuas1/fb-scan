import {ICost} from '@core/services/engine/baseEngine';

export class CostEngine implements ICost {
    private regex = /\d.tr.\d|\d,\d*tr|\d.\d*tr|\d*tr\d|\dt.\d|\dtr|\dt\d|\d.\dt|\d.\dtr/gmiu;
    getCosts(entity: IBDSModel): any[] {
        let m;
        const cost = [];
        while ((m = this.regex.exec(entity.content)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === this.regex.lastIndex) {
                this.regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                cost.push(match);
            });
        }
        return cost;
    }

}
