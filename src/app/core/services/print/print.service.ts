import {Injectable} from '@angular/core';
import * as R from 'ramda';
import * as printHtmlElement from 'print-html-element';
import {Store} from '@ngrx/store';
import {AppStates} from '../../../state-management/app-state';
import {PrintTemplateService} from '@core/services/print/print-template.service';
import {PrintTypes} from '../../../common/constants';

@Injectable()
export class PrintService {
    private test: HTMLImageElement;
    constructor(
        private store: Store<AppStates>,
        private printTemplateService: PrintTemplateService
    ) {

    }


    /**
     * @desc: Print content with fill object
     * @param: {content} content to print
     * @param: {obj} object to fill
     */
    printContent(content: string, srcObj: any, isOnlyPrint?: boolean, printType?: number): void {
        const obj = R.clone(srcObj);
        content = this.printTemplateService.getKendoTemplate(content, PrintTypes.Invoice);
        const html = kendo.template(content)(obj);
        this.print(html);
    }

    private replaceAll = (find: string, replace: string, str: string): string => {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    // printMultilContent(content: string, objs: any[], isOnlyPrint?: boolean) {
    //     let printContent: string;
    //     printContent = objs.map(obj => {
    //         const str = kendo.template(content)(obj);
    //         let itemContentHtml = this.printTemplateService.printBarcode(str, obj.Code);
    //         itemContentHtml = this.printTemplateService.printBarcodeCustomer(itemContentHtml, obj.Customer);
    //         itemContentHtml = this.printTemplateService.printBarcodeDelivery(itemContentHtml, obj.DeliveryDetail);
    //         return itemContentHtml;
    //     }).join('<div style="page-break-before: always;"></div>');
    //     setTimeout(() =>  this.print(printContent));
    // }

    /**
     * @desc: call jquery.printArea to print document
     * @param: {content} content to print
     * @param: {popTitle} print popup title
     */
    print(content: string, popTitle?: string): void {
        const printOpts: any = {
            mode: 'iframe',
            popTitle: popTitle,
            stylesheets: [''],
            styles: ['']
        };

        // if (DetectMobileHelper.isIos() || DetectMobileHelper.isAndroid() || DetectMobileHelper.isOtherMobileBrowser()) {
        //     printOpts.mode = 'popup';
        // }

        printHtmlElement.printHtml(content, printOpts);
    }
}
