import { Component, Input, OnInit, DestroyRef, inject } from '@angular/core';
import {
    ReactiveFormsModule,
    NonNullableFormBuilder,
    Validators,
    FormArray,
    FormGroup,
    FormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { Button, ButtonDirective } from 'primeng/button';
import { NgForOf, NgIf } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { MatTooltip } from '@angular/material/tooltip';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';
@Component({
    selector: 'app-corporate-commercial-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        InputText,
        Button,
        NgForOf,
        NgIf,
        TranslocoPipe,
        ButtonDirective,
        PersianCalendarComponent,
        FormsModule,
        MatTooltip,
        TableModule,
        Tooltip,
        Dialog,
    ],
    templateUrl: './citizen-commercial-info.component.html',
    styleUrls: ['./citizen-commercial-info.component.scss'],
})
export class CitizenCommercialInfoComponent implements OnInit {
    // ورودی‌های تب داینامیک
    @Input() disabled = false;
    @Input() onValueChange: (val: CommercialCard[]) => void = () => {};
    @Input() onValidityChange: (valid: boolean) => void = () => {};

    private fb = inject(NonNullableFormBuilder);
    private destroyRef = inject(DestroyRef);
    visibleContact: boolean = false;
    visibleCitizenshipContact: boolean = false;

    form = this.fb.group({
        commercialCardsFa: this.fb.array<FormGroup>([]),
    });
    economicCode;
    insuranceNumber;
    chamberCommerceMembershipNumber;
    income;
    businessCardTable: any[] = [];
    economicTable: any[] = [];
    openCitizenshipDialog() {
        this.visibleCitizenshipContact = true;
    }
    closeCitizenshipContact() {
        this.visibleCitizenshipContact = false;
    }
    submitCitizenshipContact() {
        // TODO: ارسال فرم
        this.closeCitizenshipContact();
    }


    openContact() {
        this.visibleContact = true;
    }
    closeContact() {
        this.visibleContact = false;
    }
    submitContact() {
        // TODO: ارسال فرم
        this.closeContact();
    }





    // آپشن‌ها (دلخواه نمونه‌ای)
    issuerOptions = [
        { label: 'اتاق بازرگانی تهران', value: 10 },
        { label: 'اتاق بازرگانی ایران', value: 20 },
    ];
    statusOptions = [
        { label: 'فعال', value: 1 },
        { label: 'غیرفعال', value: 0 },
    ];

    ngOnInit(): void {
        if (this.commercialCardsFa.length === 0) {
            this.addCard();
        }

        if (this.disabled) {
            this.form.disable({ emitEvent: false });
        }

        this.form.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.onValueChange(this.valueAsPayload());
                this.onValidityChange(this.form.valid);
            });
    }

    // Getter برای FormArray
    get commercialCardsFa(): FormArray<FormGroup> {
        return this.form.get('commercialCardsFa') as FormArray<FormGroup>;
    }

    // ساخت یک کارت جدید
    private buildCard(data?: Partial<CommercialCard>): FormGroup {
        return this.fb.group({
            commercialCardId: [data?.commercialCardId ?? null],
            clientId: [data?.clientId ?? 0],
            cardNumber: [
                data?.cardNumber ?? '',
                [Validators.required, Validators.maxLength(20)],
            ],
            issuerOrgId: [data?.issuerOrgId ?? 10, Validators.required],
            issueDate: [
                data?.issueDate ?? 0,
                [Validators.required, Validators.pattern(/^\d{8}$/)],
            ], // YYYYMMDD
            expireDate: [
                data?.expireDate ?? 0,
                [Validators.required, Validators.pattern(/^\d{8}$/)],
            ], // YYYYMMDD
            status: [data?.status ?? 1, Validators.required],
            description: [data?.description ?? '', Validators.maxLength(200)],
            operationFlag: [data?.operationFlag ?? 'I'],
        });
    }

    addCard(): void {
        this.commercialCardsFa.push(this.buildCard());
    }

    editCard(index: number): void {
        const grp = this.commercialCardsFa.at(index);
        if (grp && grp.get('operationFlag')?.value !== 'I') {
            grp.get('operationFlag')?.setValue('U', { emitEvent: false });
        }
    }

    removeCard(index: number): void {
        const grp = this.commercialCardsFa.at(index);
        if (!grp) return;

        // اگر آیتم تازه اضافه‌شده است، مستقیم حذف
        if (
            grp.get('operationFlag')?.value === 'I' &&
            !grp.get('commercialCardId')?.value
        ) {
            this.commercialCardsFa.removeAt(index);
        } else {
            // علامت حذف برای ارسال به بک‌اند
            grp.get('operationFlag')?.setValue('D');
        }
        this.onValueChange(this.valueAsPayload());
        this.onValidityChange(this.form.valid);
    }

    // خروجی Payload سازگار با backend: commercialCardLists[]
    private valueAsPayload(): CommercialCard[] {
        return (this.commercialCardsFa.getRawValue() as CommercialCard[]).map(
            (c) => ({
                ...c,
                issueDate: Number(c.issueDate || 0),
                expireDate: Number(c.expireDate || 0),
            })
        );
    }

    trackByIndex = (_: number, __: any) => _;

    commercialDialogForm = this.fb.group({
        taxNumber: [null, Validators.required],
        employeeCount: [null, Validators.required],
        startDate: [null, Validators.required],
        endDate: [null, Validators.required],
    });

   businessDialogForm = this.fb.group({
        businessCardType: [''],
        businessCardNumber: [''],
        issueDate: [''],
        expiryDate: [''],
        holderName: ['']
    });
}
type CommercialCard = {
    commercialCardId?: number | null;
    clientId: number;
    cardNumber: string;
    issuerOrgId: number;          // سازمان صادرکننده (اتاق بازرگانی و...)
    issueDate: number;            // YYYYMMDD (میلادی - مطابق اکثر کارت‌ها)
    expireDate: number;           // YYYYMMDD (میلادی)
    status: number;               // 1=فعال، 0=غیرفعال
    description: string;
    operationFlag: string;        // 'I'|'U'|'D'
};
