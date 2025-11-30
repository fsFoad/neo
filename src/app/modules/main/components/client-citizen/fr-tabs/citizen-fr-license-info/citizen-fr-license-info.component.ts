import { Component, EventEmitter, Input, Output, DestroyRef, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgFor, NgIf } from '@angular/common';

// PrimeNG (standalone)
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Button } from 'primeng/button';

// Transloco
import { TranslocoModule } from '@ngneat/transloco';
import {PersianCalendarComponent} from "../../../../../shared/components/persian-calendar/persian-calendar.module";

@Component({
    selector: 'app-citizen-fr-license-info',
    standalone: true,
    templateUrl: './citizen-fr-license-info.component.html',
    styleUrls: ['./citizen-fr-license-info.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgFor,
        NgIf,
        InputText,
        DropdownModule,
        Button,
        TranslocoModule,
        PersianCalendarComponent,
        // برای | transloco
    ],
})
export class CitizenLicenseInfoComponent {
    // ورودی/خروجی استاندارد تب‌ها
    @Input() disabled = false;
    @Input() onValueChange: (v: any) => void;
    @Input() onValidityChange: (v: boolean) => void;
    @Input() set value(val: LicenseInfoDto[] | null | undefined) {
        if (!val?.length) return;
        this.licenses.clear({ emitEvent: false });
        val.forEach(v => this.licenses.push(this.createRow(v), { emitEvent: false }));
        if (this.disabled) this.licenseFg.disable({ emitEvent: false });
    }

    @Output() valueChange = new EventEmitter<LicenseInfoDto[]>();
    @Output() validityChange = new EventEmitter<boolean>();

    // فرم ریشه
    licenseFg: FormGroup<{ licenses: LicensesArray }> = new FormGroup({
        licenses: new FormArray<LicenseGroup>([]),
    });

    private destroyRef = inject(DestroyRef);

    // آپشن‌ها (موقتی - بعداً از سرویس بگیر)
    licenseTypeOptions = [
        { label: 'پروانه کسب', value: 1 },
        { label: 'جواز تأسیس', value: 2 },
        { label: 'کارت بازرگانی', value: 3 },
    ];
    issuerOrgOptions = [
        { label: 'اتاق اصناف', value: 10 },
        { label: 'وزارت صمت', value: 11 },
        { label: 'اتاق بازرگانی', value: 12 },
    ];

    ngOnInit(): void {
        if (this.licenses.length === 0) this.addRow(); // حداقل یک ردیف
        if (this.disabled) this.licenseFg.disable({ emitEvent: false });

        this.licenseFg.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.valueChange.emit(this.normalize());
                this.validityChange.emit(this.licenseFg.valid);
            });
    }

    // getters
    get licenses(): LicensesArray {
        return this.licenseFg.get('licenses') as LicensesArray;
    }
    get rows(): LicenseGroup[] {
        return this.licenses.controls as LicenseGroup[];
    }

    // CRUD ردیف‌ها
    addRow(): void {
        this.licenses.push(this.createRow());
        this.emitNow();
    }
    removeRow(i: number): void {
        this.licenses.removeAt(i);
        this.emitNow();
    }

    private emitNow(): void {
        this.valueChange.emit(this.normalize());
        this.validityChange.emit(this.licenseFg.valid);
    }

    private createRow(d?: Partial<LicenseInfoDto>): LicenseGroup {
        return new FormGroup({
            operationFlag: new FormControl<'I' | 'U' | 'D'>(d?.operationFlag ?? 'I', { nonNullable: true }),
            licenseId: new FormControl<number | null>(d?.licenseId ?? null),
            clientId: new FormControl<number | null>(d?.clientId ?? null),

            licenseTypeId: new FormControl<number | null>(d?.licenseTypeId ?? null, { validators: [Validators.required] }),
            licenseNumber: new FormControl<string>(d?.licenseNumber ?? '', {
                nonNullable: true, validators: [Validators.required, Validators.maxLength(40)],
            }),
            issuerOrgId: new FormControl<number | null>(d?.issuerOrgId ?? null, { validators: [Validators.required] }),

            issueDate: new FormControl<number | null>(d?.issueDate ?? null),   // YYYYMMDD (jalali int)
            expireDate: new FormControl<number | null>(d?.expireDate ?? null), // YYYYMMDD (jalali int)
            description: new FormControl<string>(d?.description ?? '', { nonNullable: true, validators: [Validators.maxLength(200)] }),
        });
    }

    // خروجی تمیز برای ذخیره
    private normalize(): LicenseInfoDto[] {
        return (this.licenseFg.getRawValue().licenses ?? []).map(r => ({
            operationFlag: r.operationFlag,
            licenseId: r.licenseId ?? null,
            clientId: r.clientId ?? null,

            licenseTypeId: r.licenseTypeId ?? null,
            licenseNumber: r.licenseNumber ?? '',
            issuerOrgId: r.issuerOrgId ?? null,

            issueDate: r.issueDate ?? null,
            expireDate: r.expireDate ?? null,
            description: r.description ?? '',
        }));
    }
}
export interface LicenseInfoDto {
    operationFlag: 'I' | 'U' | 'D';
    licenseId?: number | null;
    clientId?: number | null;

    licenseTypeId: number | null;
    licenseNumber: string;
    issuerOrgId: number | null;

    issueDate: number | null;   // جلالی YYYYMMDD (int)
    expireDate: number | null;  // جلالی YYYYMMDD (int)
    description: string;
}
type LicenseGroup = FormGroup<{
    operationFlag: FormControl<'I' | 'U' | 'D'>;
    licenseId: FormControl<number | null>;
    clientId: FormControl<number | null>;

    licenseTypeId: FormControl<number | null>;
    licenseNumber: FormControl<string>;
    issuerOrgId: FormControl<number | null>;

    issueDate: FormControl<number | null>;
    expireDate: FormControl<number | null>;
    description: FormControl<string>;
}>;
type LicensesArray = FormArray<LicenseGroup>;
