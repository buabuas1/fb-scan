import {Injectable} from '@angular/core';
import {ToastsManager} from 'ng2-toastr';

@Injectable()
export class LoggerServiceService {
    constructor(
        private toastr: ToastsManager
    ) {
    }

    info(message: string, title?: string): void {
        this.toastr.info(message, title);
    }

    success(message: string, title?: string): void {
        this.toastr.success(message, title);
    }

    error(message: string, title?: string, options?: any): void {
        this.toastr.error(message, title, options);
    }

    warn(message: string, title?: string): void {
        this.toastr.warning(message, title);
    }
}
