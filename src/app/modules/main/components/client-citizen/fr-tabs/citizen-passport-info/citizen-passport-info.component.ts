import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Button, ButtonDirective } from 'primeng/button';
import { TranslocoPipe } from '@ngneat/transloco';
import {
    FormArray,
    FormControl,
    FormGroup,
    Validators,
    AbstractControl,
    ValidationErrors,
    ReactiveFormsModule,
    FormBuilder, FormsModule,
} from '@angular/forms';
import {PersianCalendarComponent} from "../../../../../shared/components/persian-calendar/persian-calendar.module";
import { MatTooltip } from '@angular/material/tooltip';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { DatePicker } from 'primeng/datepicker';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';


@Component({
    selector: 'app-citizen-passport-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        InputText,
        DropdownModule,
        Button,
        TranslocoPipe,
        ButtonDirective,
        PersianCalendarComponent,
        DatePipe,
        MatTooltip,
        TableModule,
        Tooltip,
        FormsModule,
        DatePicker,
        Checkbox,
        Dialog,
        // PersianCalendarComponent
    ],
    templateUrl: './citizen-passport-info.component.html',
    styleUrls: ['./citizen-passport-info.component.scss'],
})
export class CitizenPassportInfoComponent implements OnInit, OnDestroy {
    /** ورودی‌های استاندارد تب‌های داینامیک */
    @Input() disabled = false;
    @Input() onValueChange: (val: PassportInfoDto[]) => void = () => {};
    @Input() onValidityChange: (valid: boolean) => void = () => {};

    passportFg!: FormGroup<{ passports: PassportsArray }>;
    private sub = new Subscription();

    /** آپشن‌ها (فعلاً نمونه) */
    countryOptions = [
        { label: 'ایران', value: 500 },
        { label: 'ترکیه', value: 231 },
        { label: 'آلمان', value: 276 },
    ];
    citizenShipTable: any[] = [];
    passportTable: any[] = [];
    visibleCitizenshipDialog = false;
    visiblePassport = false;
    enName;
    enFamily;
    enfather;
    birthDateGregorian;
    openPassportDialog() {
        this.visiblePassportDialog = true;
    }

    openCitizenshipDialog() {
        this.visibleCitizenshipDialog = true;
    }
    closeCitizenshipDialog() {
        this.visibleCitizenshipDialog = false;
    }
    ngOnInit(): void {
        this.passportFg = new FormGroup<{ passports: PassportsArray }>({
            passports: new FormArray<PassportGroup>([this.createPassportRow()]),
        });

        if (this.disabled) this.passportFg.disable({ emitEvent: false });

        this.sub.add(
            this.passportFg.valueChanges.subscribe(() => {
                this.onValueChange(this.normalize());
                this.onValidityChange(this.passportFg.valid);
            })
        );
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    /** دسترسی به آرایه‌ی پاسپورت‌ها */

    get passports(): PassportsArray {
        // استفاده از get + cast، چون .controls ممکنه به AbstractControl سقوط کنه
        return this.passportFg.get('passports') as PassportsArray;
    }

    get passportForms(): PassportGroup[] {
        // برای *ngFor تا هر آیتم رو FormGroup بدونه
        return this.passports.controls as PassportGroup[];
    }
    addPassport(): void {
        this.passports.push(this.createPassportRow());
    }

    removePassport(i: number): void {
        this.passports.removeAt(i);
        this.onValueChange(this.normalize());
        this.onValidityChange(this.passportFg.valid);
    }
    /** ساخت یک ردیف پاسپورت با ولیدیشن‌ها */
    createPassportRow(data?: Partial<PassportInfoDto>): PassportGroup {
        return new FormGroup(
            {
                operationFlag: new FormControl<'I' | 'U' | 'D'>(
                    data?.operationFlag ?? 'I',
                    { nonNullable: true }
                ),
                passporInfotId: new FormControl<number | null>(
                    data?.passporInfotId ?? null
                ),
                clientId: new FormControl<number | null>(
                    data?.clientId ?? null
                ),
                countryId: new FormControl<number | null>(
                    data?.countryId ?? null,
                    { validators: [Validators.required] }
                ),
                passportNumber: new FormControl<string>(
                    data?.passportNumber ?? '',
                    {
                        validators: [
                            Validators.required,
                            Validators.maxLength(20),
                        ],
                    }
                ),
                passportIssueDate: new FormControl<number | null>(
                    data?.passportIssueDate ?? null
                ),
                passportExpirationDate: new FormControl<number | null>(
                    data?.passportExpirationDate ?? null
                ),
                description: new FormControl<string>(data?.description ?? ''),
            },
            { validators: this.dateOrderValidator }
        );
    }

    /** نرمال‌سازی خروجی برای ارسال به API (passportInfoList) */
    normalize(): PassportInfoDto[] {
        const raw = this.passports.getRawValue() as PassportInfoDto[];
        return raw.map((r) => ({
            operationFlag: r.operationFlag ?? 'I',
            passporInfotId: r.passporInfotId ?? undefined,
            clientId: r.clientId ?? undefined,
            countryId: Number(r.countryId),
            passportNumber: (r.passportNumber ?? '').trim(),
            passportIssueDate: r.passportIssueDate ?? undefined,
            passportExpirationDate: r.passportExpirationDate ?? undefined,
            description: r.description ?? '',
        }));
    }

    /** اگر لازم شد از بیرون دیتا Patch کنی */
    patch(list: PassportInfoDto[]) {
        this.passports.clear({ emitEvent: false });
        (list ?? []).forEach((item) =>
            this.passports.push(this.createPassportRow(item))
        );
        this.onValueChange(this.normalize());
        this.onValidityChange(this.passportFg.valid);
    }
    dateOrderValidator(ctrl: AbstractControl): ValidationErrors | null {
        const issue = ctrl.get('passportIssueDate')?.value as number | null;
        const exp = ctrl.get('passportExpirationDate')?.value as number | null;
        if (!issue || !exp) return null;
        return exp >= issue ? null : { dateOrder: true };
    }
    @Input() visiblePassportDialog = false;
    @Output() closed = new EventEmitter<void>();
    @Output() saved = new EventEmitter<PassportForm>();

    form: FormGroup;
    dateFormat = 'yy/mm/dd'; // PrimeNG format (e.g., 1403/06/07 یا 2025/08/29 بسته به تقویم شما)

    // می‌توانید لیست کشورها را از سرویس بگیرید؛ این یک نمونهٔ حداقلی است.
    countries: SelectItem<string>[] = [
        { label: 'Iran (IR)', value: 'IR' },
        { label: 'Germany (DE)', value: 'DE' },
        { label: 'Netherlands (NL)', value: 'NL' },
        { label: 'Turkey (TR)', value: 'TR' },
    ];

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group(
            {
                passportNumber: [
                    '',
                    [
                        Validators.required,
                        // الگوی رایج: حروف/عدد 6 تا 9 کاراکتر. در صورت نیاز الگوی سازمانی خودتان را جایگزین کنید.

                    ],
                ],
                passportCountry: [null, Validators.required],
                issueDate: [null, Validators.required],
                expiryDate: [null, Validators.required],
                notes: [''],
            },
            { validators: [this.expiryAfterIssueValidator] },
        );
    }

    get f() {
        return this.form.controls as Record<keyof PassportForm, AbstractControl>;
    }

    // ولیدیتور سفارشی: تاریخ انقضا باید بعد از تاریخ اخذ باشد
    private expiryAfterIssueValidator(group: AbstractControl): ValidationErrors | null {
        const issue = group.get('issueDate')?.value as Date | null;
        const expiry = group.get('expiryDate')?.value as Date | null;
        if (!issue || !expiry) return null;

        const issueTime = new Date(issue).getTime();
        const expiryTime = new Date(expiry).getTime();

        return expiryTime > issueTime ? null : { expiryBeforeIssue: true };
    }

    getPassportNumberError(): string {
        const c = this.f.passportNumber;
        if (c.hasError('required')) return 'شماره گذرنامه الزامی است.';
        if (c.hasError('pattern')) return 'فرمت شماره گذرنامه معتبر نیست.';
        return 'خطای نامشخص.';
    }

    getExpiryError(): string {
        if (this.form.hasError('expiryBeforeIssue')) {
            return 'تاریخ انقضا باید بعد از تاریخ اخذ باشد.';
        }
        const c = this.f.expiryDate;
        if (c.hasError('required')) return 'تاریخ انقضا الزامی است.';
        return 'خطای نامشخص.';
    }

    submitContact(): void {
        // نام متد را حفظ کردم تا با HTML اولیه‌ات نشکند
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const value: PassportForm = this.form.getRawValue();
        this.saved.emit(value);
        this.closePassportDialog();
    }

    closePassportDialog(): void {
        this.visiblePassportDialog = false;
        this.closed.emit();
        // در صورت نیاز: this.form.reset();
    }
}

export interface PassportInfoDto {
    operationFlag: 'I' | 'U' | 'D';
    passporInfotId?: number;         // spelling همسو با payload شما
    clientId?: number;
    countryId: number;               // کشور صادرکننده/تابعیت
    passportNumber: string;
    passportIssueDate?: number;      // YYYYMMDD میلادی
    passportExpirationDate?: number; // YYYYMMDD میلادی
    description?: string | null;
}
type PassportGroup = FormGroup<{
    operationFlag: FormControl<'I' | 'U' | 'D'>;
    passporInfotId: FormControl<number | null>;
    clientId: FormControl<number | null>;
    countryId: FormControl<number | null>;
    passportNumber: FormControl<string>;
    passportIssueDate: FormControl<number | null>;
    passportExpirationDate: FormControl<number | null>;
    description: FormControl<string>;
}>;
export interface PassportForm {
    passportNumber: string;
    passportCountry: string;  // ISO code or country id
    issueDate: Date | string;
    expiryDate: Date | string;
    notes?: string;
}
type PassportsArray = FormArray<PassportGroup>;
type SelectItem<T = any> = { label: string; value: T };
