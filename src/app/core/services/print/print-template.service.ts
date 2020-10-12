import {Injectable, Injector} from '@angular/core';
import {PrintTypes} from '../../../common/constants';
import {invoiceTokens} from '../../../common/token/invoice.token';

@Injectable()
export class PrintTemplateService {
    constructor() {
    }

    /**
     * @desc: Get kendo tempalte
     */
    getKendoTemplate = (text, type: PrintTypes): string => {
        const _kendo = this.getKendoToken(type);
        let kendoTemplate = this.processTable(text);

        if (kendoTemplate != null && _kendo != null) {
            for (let i = 0; i < _kendo.length; i++) {
                kendoTemplate = this.replaceAll(_kendo[i].value, _kendo[i].text, kendoTemplate);
            }
        }

        return kendoTemplate;
    }

    private replaceAll = (find: string, replace: string, str: string): string => {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    /**
     * @desc: Get kendo tokens by type
     * @param: {type} printe type = order, invoice ...etc..
     */
    getKendoToken = (type: PrintTypes): Array<any> => {
        switch (type) {
            case PrintTypes.Invoice:
                return invoiceTokens;

            default:
                return new Array<any>();
        }
    }

    private replaceSpencial = (str: string): string => {

        return str.replace(new RegExp('#', 'g'), function (f, idx, rem) {

            if (idx - 1 >= 0 && str[idx - 1] === '\\') {
                return f;
            } else {
                return '\\#';
            }
        });
    }

    private processTable = (text: string): string => {
        if (!text) {
            text = ''; // for undefined value
        }
        let kendoTemplate = this.replaceSpencial(text.trim());

        //#region For invoice Product Group
        let index = kendoTemplate.indexOf('{Loai_Thuc_Don}');
        let hasProductGroup = false;

        if (index >= 0) {
            hasProductGroup = true;
            let firstProductGroup = -1;
            let lastProductGroup = -1;

            for (let i = index; i >= 0; i--) {
                if (kendoTemplate.substring(i, i + 3) === '<tr') {
                    firstProductGroup = i;
                    break;
                }
            }

            for (let i = index; i <= kendoTemplate.length; i++) {
                if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                    lastProductGroup = i + 26; // plus length of first token
                }
                if (kendoTemplate.substring(i, i + 8) === '</table>') {
                    break;
                }

            }

            if (firstProductGroup >= 0 && lastProductGroup >= 0) {
                // tslint:disable-next-line:max-line-length
                kendoTemplate = [kendoTemplate.slice(0, firstProductGroup), '{First_Product_Group}', kendoTemplate.slice(firstProductGroup)].join('');
                // tslint:disable-next-line:max-line-length
                kendoTemplate = [kendoTemplate.slice(0, lastProductGroup), '{Last_Product_Group}', kendoTemplate.slice(lastProductGroup)].join('');
            }

            // replace STT
            kendoTemplate = kendoTemplate.replace(new RegExp('{STT}', 'gm'), '{STT_Group}');
        }
        //#endregion

        // For invoice detail item
        index = kendoTemplate.indexOf('{Ten_Khoan_Thu');

        if (index < 0) {
            index = kendoTemplate.indexOf('{Ma_Hang}');
        }

        if (index < 0) {
            return kendoTemplate;
        }

        let first = -1;
        let last = -1;

        for (let i = index; i >= 0; i--) {
            if (kendoTemplate.substring(i, i + 3) === '<tr') {
                first = i;
                break;
            }
        }

        for (let i = index; i <= kendoTemplate.length; i++) {
            if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                last = i + (hasProductGroup ? 18 : 12); // plus length of first token
            }
            if (kendoTemplate.substring(i, i + (hasProductGroup ? 20 : 8)) === (hasProductGroup ? '{Last_Product_Group}' : '</table>')) {
                break;
            }

        }

        if (first >= 0 && last >= 0) {
            const tokenFirst = hasProductGroup ? '{First_Group}' : '{First}';
            const tokenLast = hasProductGroup ? '{Last_Group}' : '{Last}';

            kendoTemplate = [kendoTemplate.slice(0, first), tokenFirst, kendoTemplate.slice(first)].join('');
            kendoTemplate = [kendoTemplate.slice(0, last), tokenLast, kendoTemplate.slice(last)].join('');
        }

        // for new invoice in return page
        index = kendoTemplate.indexOf('{Ten_Hang_Hoa_Moi');
        if (index < 0) {
            index = kendoTemplate.indexOf('{Ma_Hang_Moi}');
        }
        if (index >= 0) {
            let invoice_first = -1;
            let invoice_last = -1;
            for (let i = index; i >= 0; i--) {
                if (kendoTemplate.substring(i, i + 3) === '<tr') {
                    invoice_first = i;
                    break;
                }
            }
            for (let i = index; i <= kendoTemplate.length; i++) {
                if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                    invoice_last = i + 20;
                }
                if (kendoTemplate.substring(i, i + 8) === '</table>') {
                    break;
                }
            }

            if (invoice_first >= 0 && invoice_last >= 0) {
                kendoTemplate = [kendoTemplate.slice(0, invoice_first), '{Invoice_First}', kendoTemplate.slice(invoice_first)].join('');
                kendoTemplate = [kendoTemplate.slice(0, invoice_last), '{Invoice_Last}', kendoTemplate.slice(invoice_last)].join('');
            }
        }

        // for surcharge
        index = kendoTemplate.indexOf('{Ten_Loai_Thu_Khac}');
        if (index > 0) {
            let surcharge_first = -1;
            let surcharge_last = -1;
            for (let j = index; j >= 0; j--) {
                if (kendoTemplate.substring(j, j + 3) === '<tr') {
                    surcharge_first = j;
                    break;
                }
            }
            for (let i = index; i <= kendoTemplate.length; i++) {
                if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                    surcharge_last = i + 22;
                    break;
                }
            }

            if (surcharge_first >= 0 && surcharge_last >= 0) {
                // tslint:disable-next-line:max-line-length
                kendoTemplate = [kendoTemplate.slice(0, surcharge_first), '{Surcharge_First}', kendoTemplate.slice(surcharge_first)].join('');
                kendoTemplate = [kendoTemplate.slice(0, surcharge_last), '{Surcharge_Last}', kendoTemplate.slice(surcharge_last)].join('');
            }
        }

        // for return surcharge
        // for surcharge
        index = kendoTemplate.indexOf('{Ten_Loai_Thu_Khac_Hoan_Lai}');
        if (index > 0) {
            let returnSurcharge_first = -1;
            let returnSurcharge_last = -1;
            for (let i = index; i >= 0; i--) {
                if (kendoTemplate.substring(i, i + 3) === '<tr') {
                    returnSurcharge_first = i;
                    break;
                }
            }
            for (let i = index; i <= kendoTemplate.length; i++) {
                if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                    returnSurcharge_last = i + 28;
                    break;
                }
            }

            if (returnSurcharge_first >= 0 && returnSurcharge_last >= 0) {
                // tslint:disable-next-line:max-line-length
                kendoTemplate = [kendoTemplate.slice(0, returnSurcharge_first), '{ReturnSurcharge_First}', kendoTemplate.slice(returnSurcharge_first)].join('');
                // tslint:disable-next-line:max-line-length
                kendoTemplate = [kendoTemplate.slice(0, returnSurcharge_last), '{ReturnSurcharge_Last}', kendoTemplate.slice(returnSurcharge_last)].join('');
            }
        }

        // for multi payment
        index = kendoTemplate.indexOf('{Ten_Phuong_Thuc_TToan}');
        if (index > 0) {

            let multiPay_first = -1;
            let multiPay_last = -1;
            for (let i = index; i >= 0; i--) {
                if (kendoTemplate.substring(i, i + 3) === '<tr') {
                    multiPay_first = i;
                    break;
                }
            }
            for (let i = index; i <= kendoTemplate.length; i++) {
                if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                    multiPay_last = i + 22;
                    break;
                }
            }

            if (multiPay_first >= 0 && multiPay_last >= 0) {
                kendoTemplate = [kendoTemplate.slice(0, multiPay_first), '{PayMethod_First}', kendoTemplate.slice(multiPay_first)].join('');
                kendoTemplate = [kendoTemplate.slice(0, multiPay_last), '{PayMethod_Last}', kendoTemplate.slice(multiPay_last)].join('');
            }
        }

        // for product component of comboset
        // tslint:disable-next-line:max-line-length
        let arrTokenCheck = ['{Ten_Hang_Hoa_TP_Combo}', '{Ten_Hang_Hoa_Thuoc_Tinh_TP_Combo}', '{Ten_Hang_Hoa_Don_Gian_TP_Combo}', '{Ma_Hang_TP_Combo}', '{So_Luong_TP_Combo}', '{Don_Vi_Tinh_TP_Combo}'];
        let indexFirst = -1;
        let indexLast = -1;
        for (let i = 0; i < arrTokenCheck.length; i++) {
            const token = arrTokenCheck[i];
            const indexOfThisToken = kendoTemplate.indexOf(token);
            if (indexOfThisToken > 0) {
                if (indexFirst < 0) {
                    indexFirst = indexOfThisToken;
                } else if (indexFirst > indexOfThisToken) {
                    indexFirst = indexOfThisToken;
                }
            }
        }

        for (let i = 0; i < arrTokenCheck.length; i++) {
            const token = arrTokenCheck[i];
            const indexOfThisToken = kendoTemplate.lastIndexOf(token);
            if (indexOfThisToken > 0) {
                if (indexLast < 0) {
                    indexLast = indexOfThisToken;
                } else if (indexLast < indexOfThisToken) {
                    indexLast = indexOfThisToken;
                }
            }
        }

        let combo_first = -1;
        let combo_last = -1;
        for (let i = indexFirst; i >= 0; i--) {
            if (kendoTemplate.substring(i, i + 4) === '<tr>') {
                combo_first = i;
                break;
            }
            // if (kendoTemplate.substring(i, i + 3) === '<p>') {
            //     combo_first = i;
            //     break;
            // }
        }
        for (let i = indexLast; i <= kendoTemplate.length; i++) {
            if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                combo_last = i + 18;
                break;
            }
            // if (kendoTemplate.substring(i, i + 4) === '</p>') {
            //     combo_last = i + 21;
            //     break;
            // }
        }

        if (combo_first >= 0 && combo_last >= 0) {
            kendoTemplate = [kendoTemplate.slice(0, combo_first), '{Combo_First}', kendoTemplate.slice(combo_first)].join('');
            kendoTemplate = [kendoTemplate.slice(0, combo_last), '{Combo_Last}', kendoTemplate.slice(combo_last)].join('');
        }

        // for Topping
        // tslint:disable-next-line:max-line-length
        arrTokenCheck = ['{Ten_Mon_Them}', '{So_Luong_Mon_Them}', '{Don_Gia_Mon_Them}', '{Don_Gia_Chiet_Khau_Mon_Them}', '{Don_Gia_Sau_Chiet_Khau_Mon_Them}'];
        indexFirst = -1;
        indexLast = -1;
        for (let i = 0; i < arrTokenCheck.length; i++) {
            const token = arrTokenCheck[i];
            const indexOfThisToken = kendoTemplate.indexOf(token);
            if (indexOfThisToken > 0) {
                if (indexFirst < 0) {
                    indexFirst = indexOfThisToken;
                } else if (indexFirst > indexOfThisToken) {
                    indexFirst = indexOfThisToken;
                }
            }
        }
        for (let i = 0; i < arrTokenCheck.length; i++) {
            const token = arrTokenCheck[i];
            const indexOfThisToken = kendoTemplate.lastIndexOf(token);
            if (indexOfThisToken > 0) {
                if (indexLast < 0) {
                    indexLast = indexOfThisToken;
                } else if (indexLast < indexOfThisToken) {
                    indexLast = indexOfThisToken;
                }
            }
        }
        if (indexLast < 0 && indexFirst < 0) {
            return kendoTemplate;
        }
        let topping_first = -1;
        let topping_last = -1;
        for (let i = indexFirst; i >= 0; i--) {
            if (kendoTemplate.substring(i, i + 4) === '<tr>') {
                topping_first = i;
                break;
            }
            // if (kendoTemplate.substring(i, i + 3) === '<p>') {
            //     topping_first = i;
            //     break;
            // }
        }
        for (let i = indexLast; i <= kendoTemplate.length; i++) {
            if (kendoTemplate.substring(i, i + 5) === '</tr>') {
                topping_last = i + 20;
                break;
            }
            // if (kendoTemplate.substring(i, i + 4) === '</p>') {
            //     topping_last = i + 21;
            //     break;
            // }
        }
        if (topping_first >= 0 && topping_last >= 0) {
            kendoTemplate = [kendoTemplate.slice(0, topping_first), '{Topping_First}', kendoTemplate.slice(topping_first)].join('');
            kendoTemplate = [kendoTemplate.slice(0, topping_last), '{Topping_Last}', kendoTemplate.slice(topping_last)].join('');
        }

        return kendoTemplate;
    }

}
