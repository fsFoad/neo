import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
import { DropdownModule } from 'primeng/dropdown';
import { NgForOf, NgIf } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { Checkbox } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { InputNumber } from 'primeng/inputnumber';
import { Tooltip } from 'primeng/tooltip';

interface SelectOption {
    label: string;
    value: string;
}

@Component({
    selector: 'app-account-interest',
    templateUrl: './account-interest.component.html',
    styleUrls: ['./account-interest.component.scss'],
    imports: [
        ButtonDirective,
        Card,
        ReactiveFormsModule,
        PersianCalendarComponent,
        DropdownModule,
        NgForOf,
        RadioButton,
        Checkbox,
        TableModule,
        InputNumber,
        NgIf,
        Tooltip,
    ],
})
export class AccountInterestComponent implements OnInit {
    interestForm!: FormGroup;
    interestList:any[]=[]
    interestTypes: SelectOption[] = [
        { label: 'عادی', value: 'normal' },
        { label: 'جاری', value: 'current' },
        { label: 'سررسید گذشته', value: 'overdue' },
    ];

    calcMethods: SelectOption[] = [
        { label: 'ساده', value: 'simple' },
        { label: 'مرکب', value: 'compound' },
    ];

    periodTypes: SelectOption[] = [
        { label: 'روزانه', value: 'daily' },
        { label: 'ماهیانه', value: 'monthly' },
        { label: 'سالانه', value: 'yearly' },
    ];

    calcBaseOptions: SelectOption[] = [
        { label: 'روز شمار', value: 'daily' },
        { label: 'ماه شمار', value: 'monthly' },
        { label: 'سال شمار', value: 'yearly' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.interestForm = this.fb.group({
            facilityCode: [''],
            title: ['', Validators.required],
            startDate: [null, Validators.required],
            endDate: [null],

            interestType: [null, Validators.required],
            calcMethod: ['simple', Validators.required],
            periodType: ['monthly'],
            calcBase: ['daily'],

            isActive: [true],
            isDefault: [false],
            allowNegativeInterest: [false],

            tiers: this.fb.array([]),
        });

        // یک ردیف نمونه برای جدول پایین
        this.addTier();
    }

    get tiers(): FormArray {
        return this.interestForm.get('tiers') as FormArray;
    }

    createTier(): FormGroup {
        return this.fb.group({
            fromAmount: [null, Validators.required],
            toAmount: [null, Validators.required],
            rate: [null, Validators.required],
            penaltyRate: [null],
            description: [''],
        });
    }

    addTier(): void {
        this.tiers.push(this.createTier());
    }

    removeTier(index: number): void {
        this.tiers.removeAt(index);
    }

    onSubmit(): void {
        if (this.interestForm.invalid) {
            this.interestForm.markAllAsTouched();
            return;
        }

        console.log('FORM VALUE', this.interestForm.value);
        // این‌جا می‌توانی سرویس API را صدا بزنی
    }

    onCancel(): void {
        this.interestForm.reset({
            calcMethod: 'simple',
            periodType: 'monthly',
            calcBase: 'daily',
            isActive: true,
            isDefault: false,
            allowNegativeInterest: false,
        });
        this.tiers.clear();
        this.addTier();
    }
}
