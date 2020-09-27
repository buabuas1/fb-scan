import {Injectable} from '@angular/core';
import {IBDSType, ICost} from '@core/services/engine/baseEngine';
import {FindRoomEngine} from '@core/services/engine/findRoomEngine';
import {GroupFeedModel} from '@models/facebook/group-feed.model';
import {ForRentEngine} from '@core/services/engine/forRentEngine';
import {AllHouseEngine} from '@core/services/engine/allHouseEngine';
import {ChangeHostEngine} from '@core/services/engine/changeHostEngine';
import {OfficeEngine} from '@core/services/engine/officeEngine';
import {SecondHandEngine} from '@core/services/engine/secondHandEngine';
import {CostEngine} from '@core/services/engine/costEngine';
import {CommentModel} from '@models/facebook/comment.model';
import {IBDSModel} from '@models/facebook/IBDS.model';
import * as R from 'ramda';
import {LoggerServiceService} from '@core/services/logger-service/logger-service.service';

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

    constructor(private loggerService: LoggerServiceService) {
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

    public getCommentFromFeeds(feeds: any[]): Array<IBDSModel> {
        const rs: Array<IBDSModel> = [];
        feeds.forEach(f => {
            try {
                if (f.node.comet_sections.feedback.story.feedback_context
                    .feedback_target_with_context.display_comments && f.node.comet_sections.feedback.story.feedback_context
                    .feedback_target_with_context.display_comments.edges) {
                    f.node.comet_sections.feedback.story.feedback_context
                        .feedback_target_with_context.display_comments.edges.forEach(c => {
                        rs.push(new CommentModel(c));
                    });
                }
            } catch (e) {
                console.log('Lỗi ', e);
                console.log('record lỗi ', f);
            }
        });
        return rs;
    }

    public convertData(data: any[]) {
        data.forEach(value => {
            if (value && value.costs && value.costs.length > 0) {
                value.numberCosts = this.makeValueFromString(value.costs);
                value.costsView = value.costs.join('-');
            }
            value.postTimeView = new Date(value.postTime);
            value.postTime = new Date(value.postTime);
            value.viewContent = !value.isComment ? value.content : value.content + '<br>' + value.parentContent;
        });
        return data;
    }
    private makeValueFromString(values: [any]) {
        const rsArr = [];
        try {
            values.forEach(valueStr => {
                let result = 0;
                const arrDecimal = valueStr.indexOf('tr') >= 0 ? valueStr.split('tr') :
                    valueStr.split('t');
                result = parseFloat(arrDecimal[0].replace(',', '.')) * 1000000; // * 1tr
                if (arrDecimal.length === 2 && !isNaN(parseFloat('0.' + arrDecimal[1]))) {
                    result += parseFloat('0.' + arrDecimal[1].replace(' ', '')) * 1000000; // * 100 ng
                }
                rsArr.push(result);
            });
            return rsArr;
        } catch (e) {
            alert('Không thể convert string to number: ' + values);
        }

    }

    makeSearchContent(viewData: Array<IBDSModel>, searchText: string[]) {
        const specialRegex = /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/m;
        const unValid = searchText.filter(t => specialRegex.test(t));
        const valid = searchText.filter(t => !(specialRegex.test(t)));
        if (unValid && unValid.length > 0) {
            this.loggerService.warning('Không thể đánh dấu đượcc những từ khóa sau có kí tự đặc biệt: ' + unValid.join(','));
        }
        viewData = viewData.map(m => {
            m.viewContent = this.getMatchPosition(m.viewContent, valid);
            return m;
        });
        return viewData;
    }

    getMatchPosition(str: string, regexes: string[]) {
        regexes.forEach(r => {
            const regex = new RegExp(r, 'gmui');
            str = str.replace(regex, `<b class="text-white bg-dark">${r}</b>`);
        });
        return str;
    }

    stringSplice(strInput: string, idx, rem, str: string) {
        return strInput.slice(0, idx) + str + strInput.slice(idx + Math.abs(rem));
    }
}
