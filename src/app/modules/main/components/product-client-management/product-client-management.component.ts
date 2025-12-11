import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButton } from 'primeng/radiobutton';
import { Textarea } from 'primeng/textarea';
import { InputText } from 'primeng/inputtext';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-product-client-management',
    standalone: true,
    templateUrl: './product-client-management.component.html',
    styleUrls: ['./product-client-management.component.scss'],
    imports: [
        Card,
        ButtonDirective,
        ReactiveFormsModule,
        DropdownModule,
        RadioButton,
        Textarea,
        InputText,
        NgForOf,
        NgIf,
        TableModule,
        NgClass,
    ],
})
export class ProductClientManagementComponent implements OnInit {
    form!: FormGroup;
    productList: any[] = [];

    depositAccountGroups: Option[] = [
        { label: 'گروه ۱', value: 1 },
        { label: 'گروه ۲', value: 2 },
    ];

    currencyTypes: Option[] = [
        { label: 'ریال', value: 'IRR' },
        { label: 'دلار', value: 'USD' },
    ];

    products: Option[] = [
        { label: 'محصول ۱', value: 1 },
        { label: 'محصول ۲', value: 2 },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            // فیلدهای فیلتر / فرم
            depositAccountGroup: [null],
            currencyType: [null],
            product: [null],

            // اگر بعداً خواستی از اینها استفاده کنی، همین‌جا نگه‌شون دار
            productTitle: [''],
            status: ['ACTIVE'],
            startDate: [null],
            endDate: [null],
            settlementDetails: [''],

            // فیلدهای تعرفه‌ها (فعلاً در UI جدید استفاده نشده‌اند)
            generalTariff: [null],
            paymentInstrumentTariff: [null],
            lotteryTariff: [null],
            interestTariff: [null],
            physicalSettleTariff: [null],
            allowedUnitsTariff: [null],
            branchTariff: [null],
        });
    }

    onSearch(): void {
        // اینجا بر اساس this.form.value فیلتر بفرست برای backend یا NgRx
        console.log('SEARCH', this.form.value);
    }

    onClear(): void {
        this.form.reset({
            depositAccountGroup: null,
            currencyType: null,
            product: null,
            settlementDetails: '',
        });
    }

    onCancel(): void {
        // لاجیک انصراف (مثلاً مسیر قبلی، یا reset کامل فرم)
        this.form.reset();
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        console.log('SUBMIT', this.form.value);
        // اینجا می‌تونی facade.save(...) یا سرویس Http رو صدا بزنی
    }
}

interface Option {
    label: string;
    value: any;
}
