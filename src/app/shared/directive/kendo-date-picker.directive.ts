import { Directive, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';
@Directive({
    selector: '[kvKendoDatePicker]'
})
export class KendoDatePickerDirective implements OnInit, OnDestroy, OnChanges {
    @Input() kvModel: Date;
    @Input() kvOptions: kendo.ui.DatePickerOptions;
    @Input() disabled: boolean;

    @Output('kvModelChange') kvModelChange: EventEmitter<Date> = new EventEmitter<Date>();

    private datePicker: kendo.ui.DatePicker;

    constructor(
        private elementRef: ElementRef
    ) { }

    ngOnInit(): void {
        const self = this;

        // init
        $(this.elementRef.nativeElement).kendoDatePicker(this.kvOptions);

        // assign context
        this.datePicker = $(this.elementRef.nativeElement).data('kendoDatePicker');

        // assign value
        this.datePicker.value(this.kvModel);

        // bind event
        this.datePicker.bind('change', function () {
            const value = this.value();
            self.kvModelChange.emit(value);
        });

        if (this.disabled) {
            this.datePicker.enable(false);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.datePicker) {
            if (changes.kvModel) {
                if (changes.kvModel.currentValue) {
                    this.datePicker.value(kendo.parseDate(changes.kvModel.currentValue));
                } else {
                    // this.datePicker.value(null);
                }
            } else if (changes.kvOptions) {
                this.datePicker.setOptions(Object.assign({}, this.kvOptions, changes.kvOptions.currentValue));
            }

            if (changes.disabled) {
                if (changes.disabled.currentValue) {
                    this.datePicker.enable(false);
                } else {
                    this.datePicker.enable(true);
                }
            }
        }
    }

    ngOnDestroy(): void {
        this.datePicker.destroy();
    }
}
