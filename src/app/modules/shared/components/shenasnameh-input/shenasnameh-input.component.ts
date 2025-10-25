import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Constants } from '../../constants/Constants';

@Component({
    selector: 'app-shenasnameh-input',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        DropdownModule,
        FormsModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ShenasnamehInputComponent),
            multi: true,
        },
    ],
    templateUrl: './shenasnameh-input.component.html',
    styleUrl: './shenasnameh-input.component.scss',
})
export class ShenasnamehInputComponent {
    /* /!** کلاس‌های داده‌شده روی خود تگ را به کانتینر داخلی پاس می‌دهیم *!/
    @Input('class') hostClass = '';
    @Input() disabled = false;
    @Input() readonly = false;

    @Input() serialPlaceholder = 'مثلاً 123456';
    @Input() serialMinLength = 6;
    @Input() serialMaxLength = 8;

    @Input() letters: string[] = Constants.PERSIAN_LETTERS;
    @Input() seriesNumberPlaceholder = 'مثلاً 12';
    @Input() seriesNumberMaxLength = 2;

    form: FormGroup<{ serial: FormControl<string>, letter: FormControl<string>, number: FormControl<string> }>;
    get letterOptions() { return this.letters.map(l => ({ label: l, value: l })); }

    private onChange: (v: ShenasnamehValue | null) => void = () => {};
    private onTouched: () => void = () => {};

    constructor(private fb: FormBuilder) {
        this.form = this.fb.nonNullable.group({
            serial: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\d{6,8}$/)]),
            letter: this.fb.nonNullable.control('', [Validators.required]),
            number: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(/^\d{1,3}$/)]),
        });

        this.form.valueChanges.subscribe(() => {
            const serial = Constants.faToEnDigits(this.form.controls.serial.value);
            const number = Constants.faToEnDigits(this.form.controls.number.value);
            if (serial !== this.form.controls.serial.value) this.form.controls.serial.setValue(serial as any, { emitEvent:false });
            if (number !== this.form.controls.number.value) this.form.controls.number.setValue(number as any, { emitEvent:false });
            const value: ShenasnamehValue = { serial, series: { letter: this.form.controls.letter.value, number } };
            this.onChange(this.form.valid ? value : null);
        });
    }

    // CVA
    writeValue(v: ShenasnamehValue | null): void {
        if (!v) { this.form.reset({ serial:'', letter:'', number:'' }, { emitEvent:false }); return; }
        this.form.setValue({ serial: Constants.faToEnDigits(v.serial||''), letter: v.series?.letter||'', number: Constants.faToEnDigits(v.series?.number||'') }, { emitEvent:false });
    }
    registerOnChange(fn: any) { this.onChange = fn; }
    registerOnTouched(fn: any) { this.onTouched = fn; }
    setDisabledState(dis: boolean) { this.disabled = dis; dis ? this.form.disable({emitEvent:false}) : this.form.enable({emitEvent:false}); }

    get serialCtrl() { return this.form.controls.serial; }
    get letterCtrl() { return this.form.controls.letter; }
    get numberCtrl() { return this.form.controls.number; }
    get serialPattern() { return new RegExp(`^\\d{${this.serialMinLength},${this.serialMaxLength}}$`); }
    get seriesNumberPattern() { return new RegExp(`^\\d{1,${this.seriesNumberMaxLength}}$`); }*/
    @Input() dropdownOptions = [
        'آ','ا','ب','پ','ت','ث','ج','چ','ح','خ','د','ذ','ر','ز','ژ','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ک','گ','ل','م','ن','و','ه','ی'
    ].map(ch => ({ label: ch, value: ch }));
    @Input() placeholderA = 'قسمت اول';
    @Input() placeholderB = 'قسمت دوم';


    @Input() value = { partA: '', partB: '', partC: '' };
    @Output() valueChange = new EventEmitter<any>();

    onPartAChange(v: string) {
        this.value = { ...this.value, partA: v.slice(0, 10) }; // محدودیت 10 کاراکتر
        this.emit();
    }

    onPartBChange(v: string) {
        // فقط 3 کاراکتر؛ اگر خواستید 2-3، اعتبارسنجی در سطح فرم انجام دهید
        this.value = { ...this.value, partB: v.slice(0, 3) };
        this.emit();
    }

    onPartCChange(v: string) {
        this.value = { ...this.value, partC: v };
        this.emit();
    }

    get combined(): string {
        const a = this.value.partA || '';
        const b = this.value.partB || '';
        const c = this.value.partC || '';
        return [a, b, c].filter(Boolean).join('/');
    }

    private emit() {
        this.valueChange.emit(this.value);
    }
}

export interface ShenasnamehValue {
    serial: string; // 6–8 digits
    series: { letter: string; number: string }; // 1–3 digits
}
