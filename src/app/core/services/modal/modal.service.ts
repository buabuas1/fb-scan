import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { ConfirmComponent, IConfirmOptions } from '../../../common/confirm/confirm.component';
import {ModalConfig} from '../../../common/modal/modal-config.modal';
import {ModalComponent} from '../../../common/modal/modal.component';

@Injectable()
export class ModalService {

    public subscriber: Subscription;
    constructor(private modalService: BsModalService) {
    }

    openModal(config: ModalConfig, options?: ModalOptions): BsModalRef {
        let bsModalRef: BsModalRef;

        bsModalRef = this.modalService.show(ModalComponent, options);
        bsModalRef.content.config = config;

        // this.subscriber = this.modalService.onHide.subscribe(() => {
        //     if (config.onClose) {
        //         config.onClose();
        //     }
        //     this.subscriber.unsubscribe();
        // });

        return bsModalRef;
    }

    confirm(options: IConfirmOptions): Observable<any> {
        return new Observable(obs => {
            this.openModal({
                title: options.title || '',
                component: ConfirmComponent,
                inputs: [{
                    key: 'options',
                    value: options
                }],
                onSubmit: (val) => {
                    obs.next(val || true);
                },
                onClose: () => {
                    obs.next(false);
                }
            }, {
                class: 'modal-confirm',
                ignoreBackdropClick: options.ignoreBackdropClick
            });
        });
    }
}
