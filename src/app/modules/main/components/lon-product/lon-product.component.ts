import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { Button, ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
import { ProductCreateComponent } from './product-create/product-create.component';

interface OptionItem {
    label: string;
    value: string | number;
}
@Component({
    selector: 'app-lon-product',
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        InputText,
        DropdownModule,
        Button,
        ButtonDirective,
        TranslocoPipe,
        PersianCalendarComponent,
        MatTooltip,
        TableModule,
        Tooltip,
        Checkbox,
        Dialog,
        DropdownModule,
        ReactiveFormsModule,
        FormsModule,
        ProductCreateComponent,
    ],
    templateUrl: './lon-product.component.html',
    styleUrl: './lon-product.component.scss',
    standalone: true,
})
export class LonProductComponent implements OnInit {
    productForm!: FormGroup;
    showForm: boolean = false;
    productTable = [
        {
            productCode: '24001',
            contractType: 'قرض‌الحسنه',
            planType: 'خدمتی',
            usageType: 'استفاده در داخل',
            productTitle: 'فرزندآوری',
            active: false,
        },
        {
            productCode: '24002',
            contractType: 'قرض‌الحسنه',
            planType: 'خدمتی',
            usageType: 'استفاده در داخل',
            productTitle: 'ازدواج',
            active: false,
        },
        {
            productCode: '26001',
            contractType: 'مرابحه',
            planType: 'مسکن و ساختمان',
            usageType: 'استفاده در داخل',
            productTitle: 'خرید کالا',
            active: false,
        },
    ];

    // ✅ آرایه‌های معمولی برای PrimeNG
    contractTypeList = [
        { label: 'عادی', value: 1 },
        { label: 'اقساطی', value: 2 },
        { label: 'ویژه', value: 3 },
    ];
    statusList = [
        { label: 'فعال', value: 1 },
        { label: 'غیرفعال', value: 2 },
    ];

    planTypeList = [
        { label: 'طلایی', value: 1 },
        { label: 'نقره‌ای', value: 2 },
        { label: 'برنزی', value: 3 },
    ];

    usageTypeList = [
        { label: 'شخصی', value: 1 },
        { label: 'تجاری', value: 2 },
    ];

    ngOnInit() {
        this.productForm = this.fb.group({
            contractTypeId: [null],
            planTypeId: [null],
            usageTypeId: [null],
            productCode: [{ value: '', disabled: true }],
            productTitle: [''],
            statusId: [''],
        });
        if (this.disabled) {
            this.form.disable({ emitEvent: false });
        }
    }

    onContractTypeChange(value: string | number) {
        console.log('Contract Type changed:', value);
    }

    onPlanTypeChange(value: string | number) {
        console.log('Plan Type changed:', value);
    }

    onUsageTypeChange(value: string | number) {
        console.log('Usage Type changed:', value);
    }

    onStatusChange(value: string | number) {
        console.log('Status changed:', value);
    }

    onSubmit(): void {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            console.warn(' فرم معتبر نیست');
            return;
        }

        const productData = this.productForm.value;
    }

    onReset(): void {
        this.productForm.reset();
    }
    @Input() disabled = false;
    // @Output() valueChange = new EventEmitter<{
    //     clientEucationtInfoLists: EducationItem[];
    // }>();
    @Output() validityChange = new EventEmitter<boolean>();
    form!: FormGroup;
    EducationTable: any[] = [];
    visibleEducate = false;

    cityOptions = [
        { label: 'تهران', value: 22 },
        { label: 'مشهد', value: 51 },
    ];
    constructor(private fb: FormBuilder) {}

    closeEducate() {
        this.visibleEducate = false;
    }

    submitEducate() {
        // TODO: ارسال فرم
        this.closeEducate();
    }

    ngOnDestroy(): void {
        // چون از Subscription جداگانه استفاده نکردیم، چیزی برای unsubscribe نیست
    }

    get educationsFa(): FormArray {
        return this.form.get('educations') as FormArray;
    }
    productCreate() {
        console.log('ایجاد محصول جدید');
        this.showForm = true;
    }

    viewProduct(row: any) {
        console.log('مشاهده', row);
    }

    editProduct(row: any) {
        console.log('ویرایش', row);
    }

    copyProduct(row: any) {
        console.log('کپی محصول', row);
    }
    onFormSubmit(product: any) {
        this.productTable.push(product);
        this.showForm = false;
    }

    onFormCancel() {
        this.showForm = false;
    }
}
