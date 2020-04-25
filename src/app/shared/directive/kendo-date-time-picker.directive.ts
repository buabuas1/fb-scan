import { Directive, OnInit, OnDestroy, OnChanges, EventEmitter, ElementRef, Output, Input, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';
@Directive({
    selector: '[kvKendoDateTimePicker]'
})
export class KendoDateTimePickerDirective implements OnInit, OnDestroy, OnChanges {
    @Input() kvModel: Date;
    @Input() kvOptions: kendo.ui.DateTimePickerOptions;
    @Input() kvSetMaxIsCurrent: boolean;
    @Input() disabled: boolean;
    @Input() kvSetEmptyDefault: boolean;

    @Output('kvModelChange') kvModelChange: EventEmitter<Date> = new EventEmitter<Date>();

    private dateTimePicker: kendo.ui.DateTimePicker;

    constructor(
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        const self = this;

        if (this.kvSetMaxIsCurrent) {
            this.kvOptions.max = new Date((new Date()).setHours(23, 59, 59, 999));
        }

        // init
        $(this.elementRef.nativeElement).kendoDateTimePicker(this.kvOptions);

        // assign context
        this.dateTimePicker = $(this.elementRef.nativeElement).data('kendoDateTimePicker');

        // assign value
        if (!this.kvSetEmptyDefault || this.kvModel !== undefined) {
            this.dateTimePicker.value(moment(this.kvModel).toDate());
        }

        // bind event
        this.dateTimePicker.bind('change', function () {
            let value = this.value();
            if (this.kvSetMaxIsCurrent && value > new Date()) {
                value = new Date();
            }
            self.kvModelChange.emit(value);
        });

        if (this.disabled) {
            this.dateTimePicker.enable(false);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.dateTimePicker) {
            if (changes.kvModel) {
                if (changes.kvModel.currentValue) {
                    this.dateTimePicker.value(kendo.parseDate(changes.kvModel.currentValue));
                } else {
                    this.dateTimePicker.value(null);
                }
            } else if (changes.kvOptions) {
                this.dateTimePicker.setOptions(Object.assign({}, this.kvOptions, changes.kvOptions.currentValue));
            }

            if (changes.disabled) {
                if (changes.disabled.currentValue) {
                    this.dateTimePicker.enable(false);
                } else {
                    this.dateTimePicker.enable(true);
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.dateTimePicker.destroy();
    }
}
