import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule, Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { InputText } from 'primeng/inputtext';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgComponentOutlet, NgFor, NgForOf, NgIf } from '@angular/common';
import { ProductAdditionalInfoComponent } from '../product-additional-info/product-additional-info.component';
import {
    ProductCollateralInfoComponentComponent
} from '../product-collateral-info/product-collateral-info-component.component';
import { ProductDocumentsInfoComponent } from '../product-documents-info/product-documents-info.component';
import { ProductUsageUnitsComponent } from '../product-usage-units/product-usage-units.component';
import { PersianCalendarComponent } from '../../../../shared/components/persian-calendar/persian-calendar.module';
import { InputSwitch } from 'primeng/inputswitch';
import { ButtonDirective } from 'primeng/button';
@Component({
    selector: 'app-product-create',
    imports: [
        FormsModule,
        DropdownModule,
        TableModule,
        ReactiveFormsModule,
        MatTabGroup,
        InputText,
        MatTab,
        MatIcon,
        NgClass,
        NgIf,
        NgFor,
        MatTabContent,
        MatTabLabel,
        PersianCalendarComponent,
        InputSwitch,
        ButtonDirective,
        NgComponentOutlet,
    ],
    templateUrl: './product-create.component.html',
    styleUrl: './product-create.component.scss',
    standalone: true,
})
export class ProductCreateComponent implements OnInit {
    @Output() formSubmit = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    productForm!: FormGroup;
    selectedIndex = 0;

    // 🧩 تب‌ها
    tabs: any[] = [];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createForm();

        // مقداردهی تب‌ها بعد از ساخته شدن فرم
        this.tabs = [
            { label: 'اطلاعات اصلی', icon: 'assignment', cmp: null },
            {
                label: 'اطلاعات تکمیلی',
                icon: 'description',
                cmp: ProductAdditionalInfoComponent,
                inputs: { form: this.productForm },
            },
            {
                label: 'معرفی وثایق و تضامین',
                icon: 'security',
                cmp: ProductCollateralInfoComponentComponent,
                inputs: { form: this.productForm },
            },
            {
                label: 'معرفی مدارک استعلامی',
                icon: 'folder_shared',
                cmp: ProductDocumentsInfoComponent,
                inputs: { form: this.productForm },
            },
            {
                label: 'واحدهای استفاده کننده',
                icon: 'apartment',
                cmp: ProductUsageUnitsComponent,
                inputs: { form: this.productForm },
            },
        ];
    }

    // 🧱 ایجاد فرم
    createForm() {
        this.productForm = this.fb.group({
            // دراپ‌داون‌ها
            contractTypeId: [null, Validators.required],
            planTypeId: [null],
            usageTypeId: [null],
            customerTypeId: [null],
            currencyId: ['IRR'],
            franchiseTypeId: [null],
            repaymentTypeId: [null],
            delayBaseId: [null],
            alertPatternId: [null],
            statusId: [1],

            // متنی
            productCode: [{ value: '', disabled: true }],
            productTitle: [
                '',
                [Validators.required, Validators.maxLength(100)],
            ],
            description: [''],

            // عددی
            maxFacilityAmount: [null, [Validators.min(100000)]],
            approvalDuration: [null, [Validators.min(1)]],
            guarantorCount: [null, [Validators.min(0)]],
            ageFrom: [null, [Validators.min(10)]],
            ageTo: [null, [Validators.max(99)]],

            // تاریخی
            startDate: [null, Validators.required],
            endDate: [null, Validators.required],

            // سوئیچ‌ها
            hasCentralBankCode: [false],
            holidayLossCalc: [false],
            transferable: [false],
            isNew: [false],
            isActive: [false],
        });
    }

    // 🔹 رویداد ارسال فرم
    onSubmit() {
        if (this.productForm.valid) {
            this.formSubmit.emit(this.productForm.getRawValue());
        } else {
            this.productForm.markAllAsTouched();
        }
    }

    // 🔹 لغو عملیات
    onCancel() {
        this.cancel.emit();
    }
}
