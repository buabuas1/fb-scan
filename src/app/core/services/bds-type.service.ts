import {Injectable} from '@angular/core';
import {IBDSType, ICost} from '@core/services/engine/baseEngine';
import {FindRoomEngine} from '@core/services/engine/findRoomEngine';
import {OtherEngine} from '@core/services/engine/otherEngine';
import {GroupFeedModel} from '@models/facebook/group-feed.model';
import {ForRentEngine} from '@core/services/engine/forRentEngine';
import {AllHouseEngine} from '@core/services/engine/allHouseEngine';
import {ChangeHostEngine} from '@core/services/engine/changeHostEngine';
import {OfficeEngine} from '@core/services/engine/officeEngine';
import {SecondHandEngine} from '@core/services/engine/secondHandEngine';
import {CostEngine} from '@core/services/engine/costEngine';

@Injectable()
export class BdsTypeService {
    OTHER_ID = 'KHAC';
    engineTypes = [
        {
            'id': 'CHO_THUE_PHONG',
            'name': 'Cho thuê phòng',
            'matched_expressions': [
                '(cho thuê, khoá vân tay)',
                'CCMN&24/7',
                'CCMN&24/24'
            ],
            'Type': ForRentEngine
        },
        {
            'id': 'CHO_THUE_NHA',
            'name': 'Cho thuê nhà nguyên căn',
            'matched_expressions': [
                '(nguyên căn)'
            ],
            'Type': AllHouseEngine
        },
        {
            'id': 'TIM_PHONG',
            'name': 'Tìm phòng',
            'matched_expressions': [
                '(Cần tìm phòng, tìm phòng, muốn thuê phòng, tìm phòg, tìm nhà, cần thuê)'
            ],
            'negative_expressions': [
                'nguyên căn'
            ],
            'Type': FindRoomEngine
        },
        {
            'id': 'SANG_NHUONG',
            'name': 'Sang nhượng',
            'matched_expressions': [
                '(nhượng)'
            ],
            'Type': ChangeHostEngine
        },
        {
            'id': 'VAN_PHONG',
            'name': 'Văn phòng',
            'matched_expressions': [
                '(văn phòng)'
            ],
            'Type': OfficeEngine
        },
        {
            'id': 'THANH_LY',
            'name': 'Thanh lý',
            'matched_expressions': [
                '(thanh  lý , thanh lí)'
            ],
            'Type': SecondHandEngine
        }
    ];

    constructor() {
    }

    public factoryBDSType = (engineType: string): IBDSType => {
        const type = this.engineTypes.find(t => t.id === engineType);
        const engine = Object.create(type.Type.prototype) as IBDSType;
        engine.constructor.apply(engine);
        return engine;
    }

    public factoryBDSCost = (engineType?: string): ICost => {
        const type = {Type: CostEngine};
        const engine = Object.create(type.Type.prototype) as ICost;
        engine.constructor.apply(engine);
        return engine;
    }

    public getBDSType(model: IBDSModel): any[] {
        const types = [];
        for (let i = 0; i < this.engineTypes.length; i++) {
            const engine = this.factoryBDSType(this.engineTypes[i].id);
            if (engine.validateType(model) === true) {
                types.push(this.engineTypes[i].id);
            }
        }
        return types && types.length > 0 ? types : [this.OTHER_ID];
    }

    public getBDSCost(data: IBDSModel) {
        const engine = this.factoryBDSCost();
        return engine.getCosts(data);
    }

    public classifyBDSType(data: Array<GroupFeedModel>) {
        return data.map(d => {
            d.contentTypes = this.getBDSType(d);
            d.costs = this.getBDSCost(d);
            return d;
        });
    }

    public removeUnusedContent(data: any[]) {
        return data.filter(r => !r.node.suggested_users);
    }

}
