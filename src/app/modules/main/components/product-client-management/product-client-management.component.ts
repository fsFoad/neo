import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButton } from 'primeng/radiobutton';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
import { Textarea } from 'primeng/textarea';
import { InputText } from 'primeng/inputtext';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';

interface Option {
    label: string;
    value: any;
}

interface TariffRow {
    key: string;
    label: string;
    options: Option[];
}

@Component({
    selector: 'app-product-client-management',
    templateUrl: './product-client-management.component.html',
    imports: [
        Card,
        ButtonDirective,
        ReactiveFormsModule,
        DropdownModule,
        RadioButton,
        PersianCalendarComponent,
        Textarea,
        InputText,
        NgForOf,
        NgIf,
        TableModule,
        NgClass,
    ],
    styleUrls: ['./product-client-management.component.scss'],
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

    // تعرفه‌های هر ردیف – فعلاً همه از یک لیست نمونه استفاده می‌کنند
    tariffOptions: Option[] = [
        { label: 'تعرفه ۱', value: 1 },
        { label: 'تعرفه ۲', value: 2 },
    ];

    tariffRows: TariffRow[] = [
        {
            key: 'generalTariff',
            label: 'نمایه عمومی',
            options: this.tariffOptions,
        },
        {
            key: 'paymentInstrumentTariff',
            label: 'نمایه ابزار برداشت مجاز',
            options: this.tariffOptions,
        },
        {
            key: 'lotteryTariff',
            label: 'نمایه قرعه‌کشی',
            options: this.tariffOptions,
        },
        {
            key: 'interestTariff',
            label: 'نمایه سود',
            options: this.tariffOptions,
        },
        {
            key: 'physicalSettleTariff',
            label: 'نمایه تسویه / برداشت فقره‌ای',
            options: this.tariffOptions,
        },
        {
            key: 'allowedUnitsTariff',
            label: 'نمایه واحدهای عملیاتی مجاز',
            options: this.tariffOptions,
        },
        {
            key: 'branchTariff',
            label: 'نمایه تمدید',
            options: this.tariffOptions,
        },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            depositAccountGroup: [null],
            currencyType: [null],
            product: [null],
            productTitle: [''],
            status: ['ACTIVE'],
            startDate: [null],
            endDate: [null],
            settlementDetails: [''],

            // فیلدهای تعرفه‌ها
            generalTariff: [null],
            paymentInstrumentTariff: [null],
            lotteryTariff: [null],
            interestTariff: [null],
            physicalSettleTariff: [null],
            allowedUnitsTariff: [null],
            branchTariff: [null],
        });
    }

    onCreate(): void {
        this.form.reset({
            status: 'ACTIVE',
        });
    }

    onEdit(): void {
        // اینجا بر اساس ردیف انتخاب‌شده، فرم را با داده‌ها پر کن
    }

    onDelete(): void {
        // حذف محصول انتخاب‌شده
    }

    showTariffDetails(key: string): void {
        // نمایش دیالوگ/صفحه‌ی جزئیات تعرفه
        console.log('show details for', key, this.form.get(key)?.value);
    }

    onCancel(): void {
        // بسته‌شدن فرم یا برگشت به صفحه قبل
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        console.log('form value', this.form.value);
        // ارسال به سرویس بک‌اند
    }
}
