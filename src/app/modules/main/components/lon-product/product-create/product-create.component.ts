import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputSwitch } from 'primeng/inputswitch';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { InputText } from 'primeng/inputtext';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { Checkbox } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
@Component({
    selector: 'app-product-create',
    imports: [
        FormsModule,
        DropdownModule,
        TableModule,
        ButtonDirective,
        ReactiveFormsModule,
        InputSwitch,
        MatTabGroup,
        InputText,
        MatTab,
        MatIcon,
        NgClass,
        Checkbox,
        NgIf,
        Tooltip,
        TranslocoPipe,
    ],
    templateUrl: './product-create.component.html',
    styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent implements OnInit {
    @Input() productData: any;
    @Output() formSubmit = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();
    productForm!: FormGroup;
    selectedIndex = 0;
    /*   tabs = [
        {
            id: 'identity',
            label: 'اطلاعات هویتی',
            icon: 'badge',
            cmp: CitizenIdentityInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('identity', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('identity', valid),
            },
        },
        {
            id: 'contact',
            label: 'اطلاعات تماس',
            icon: 'contacts',
            cmp: CitizenContactInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('contact', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('contact', valid),
            },
        },
        {
            id: 'signature',
            label: 'امضاء',
            icon: 'draw',
            cmp: CitizenSignatureInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('signature', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('signature', valid),
            },
        },
        {
            id: 'relations',
            label: 'روابط',
            icon: 'group',
            cmp: CitizenRelationsInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('relations', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('relations', valid),
            },
        },
        {
            id: 'industry',
            label: 'زمینه فعالیت',
            icon: 'category',
            cmp: CitizenActivityInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('activity', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('activity', valid),
            },
        },
        {
            id: 'edu',
            label: 'اطلاعات تحصیلی',
            icon: 'school',
            cmp: CitizenEducationInfoComponent,
            inputs: {
                disabled: false,
                outputs: {
                    valueChange: (e: any) => this.collect('education', e),
                    validityChange: (v: boolean) =>
                        this.setTabValidity('education', v),
                },
            },
        },
        {
            id: 'docs',
            label: 'مستندات',
            icon: 'folder_open',
            cmp: CitizenDocumentsInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('documents', payload),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('documents', valid),
            },
        },
        {
            id: 'extra',
            label: 'اطلاعات تکمیلی',
            icon: 'info',
            cmp: CitizenExtraInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('extra', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('extra', valid),
            },
        },
        {
            id: 'business',
            label: 'اطلاعات تجاری',
            icon: 'storefront',
            cmp: CitizenCommercialInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('business', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('business', valid),
            },
        },
        {
            id: 'passport',
            label: 'اطلاعات گذرنامه - تابعیت',
            icon: 'public',
            cmp: CitizenPassportInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('passport', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('passport', valid),
            },
        },
        {
            id: 'license',
            label: 'اطلاعات مجوز',
            icon: 'verified',
            cmp: CitizenLicenseInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('license', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('license', valid),
            },
        },
        {
            id: 'final',
            label: 'تأیید نهایی',
            icon: 'fact_check',
            cmp: CitizenConfirmationInfoComponent,
            inputs: {
                disabled: false,
                // لودر از سرویس
                loader: () =>
                    this.reviewSvc.getChangeFlags(this.currentClientId),
                // کال‌بک ثبت
                submitClick: () => this.onFinalSubmit(),
            },
        },
    ];*/

    contractTypeList = [
        { label: 'قرض‌الحسنه', value: 1 },
        { label: 'مشارکتی', value: 2 },
        { label: 'مبادله‌ای', value: 3 },
    ];

    planTypeList = [
        { label: 'طرح کوتاه‌مدت', value: 1 },
        { label: 'طرح بلندمدت', value: 2 },
    ];

    usageTypeList = [
        { label: 'استفاده در داخل', value: 1 },
        { label: 'استفاده در خارج', value: 2 },
    ];

    customerTypes = [
        { label: 'حقیقی', value: 'real' },
        { label: 'حقوقی', value: 'legal' },
        { label: 'هردو', value: 'both' },
    ];

    currencyList = [
        { label: 'ریال ایران', value: 'IRR' },
        { label: 'دلار آمریکا', value: 'USD' },
        { label: 'یورو', value: 'EUR' },
    ];
    constructor(private fb: FormBuilder) {}
    ngOnInit() {
        console.log('productData', this.productData);
        this.productForm = this.fb.group({
            contractTypeId: [null, Validators.required],
            planTypeId: [null, Validators.required],
            usageTypeId: [null, Validators.required],
            customerTypeId: [null, Validators.required],
            currencyId: ['IRR', Validators.required],
            productCode: [{ value: '', disabled: true }],
            productTitle: ['', Validators.required],
            maxAmount: [null, [Validators.min(100000)]],
            isActive: [false],
            description: [''],
        });

        if (this.productData) {
            this.productForm.patchValue(this.productData);
        }
    }
    onSubmit() {
        if (this.productForm.valid) {
            this.formSubmit.emit(this.productForm.getRawValue());
        } else {
            this.productForm.markAllAsTouched();
        }
    }

    onCancel() {
        this.cancel.emit();
    }
}
