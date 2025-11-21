import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitch } from 'primeng/inputswitch';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { RadioButton } from 'primeng/radiobutton';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Checkbox } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { Textarea } from 'primeng/textarea';

@Component({
    selector: 'app-loan-contract',
    standalone: true,
    imports: [
        ButtonDirective,
        Dialog,
        DropdownModule,
        InputSwitch,
        InputText,
        NgIf,
        PrimeTemplate,
        RadioButton,
        ReactiveFormsModule,
        TableModule,
        Checkbox,
        Tooltip,
        TranslocoPipe,
        Textarea,
    ],
    templateUrl: './loan-contract.component.html',
    styleUrl: './loan-contract.component.scss',
})
export class LoanContractComponent implements OnInit {
    showForm = false;
    formMode: 'customer' | 'product' | 'approval' = 'customer';
    form!: FormGroup;
    productForm!: FormGroup;

    // جدول اطلاعات مشتری
    customerTable = [
        {
            customerNumber: '100245',
            customerName: 'علی رضایی',
            nationalId: '1234567890',
            citizenship: 'ایرانی',
            type: 'حقیقی',
        },
    ];

    // جدول اطلاعات محصول
    productTable = [
        {
            title: 'وام خرید خودرو',
            maxAmount: '500,000,000',
            maxDuration: '36 ماه',
            currency: 'ریال',
        },
    ];

    // جدول اطلاعات مصوبه
    approvalTable = [
        {
            approvedAmount: '400,000,000',
            approvalDuration: '6 ماه',
            loanDuration: '24 ماه',
            interestRate: '18%',
            penaltyRate: '4%',
        },
    ];

    operationSteps = [
        { label: 'مبادله ای', value: '1' },
        { label: 'مشارکتی', value: '2' },
        { label: 'قرض الحسنه', value: '3' },
        { label: 'اقساط قرارداد', value: '4' },
    ];
    showProductDetails = false;
    showApprovalDetails = false;

    selectedProduct: any = null;
    selectedApproval: any = null;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createCustomerForm();

        this.productForm = this.fb.group({
            renewable: ['', Validators.required],
            description: ['', Validators.required],
            graceDays: ['', Validators.required],
            contractDueDate: ['', Validators.required],
            profitFeeCalculationMethod: ['', Validators.required],
            feeReceiveMethod: ['', Validators.required],
            graceFeeKeepMethod: ['', Validators.required],
            gracePeriodFee: ['', Validators.required],
            installmentsInterval: ['', Validators.required],
            amount: ['', Validators.required],
            notes: ['', Validators.required],
            installmentsCount: ['', Validators.required],
            date: ['', Validators.required],
            step: ['', Validators.required],
        });
    }

    // ساختارهای فرم
    createCustomerForm() {
        this.formMode = 'customer';
        this.form = this.fb.group({
            customerNumber: ['', Validators.required],
            customerName: ['', Validators.required],
            nationalId: ['', Validators.required],
            citizenship: ['', Validators.required],
            type: ['', Validators.required],
        });
    }

    createProductForm() {
        this.formMode = 'product';
        this.form = this.fb.group({
            title: ['', Validators.required],
            maxAmount: ['', Validators.required],
            maxDuration: ['', Validators.required],
            currency: ['', Validators.required],
        });
    }

    createApprovalForm() {
        this.formMode = 'approval';
        this.form = this.fb.group({
            approvedAmount: ['', Validators.required],
            approvalDuration: ['', Validators.required],
            loanDuration: ['', Validators.required],
            interestRate: ['', Validators.required],
            penaltyRate: ['', Validators.required],
        });
    }

    // باز کردن فرم
    openForm(type: 'customer' | 'product' | 'approval') {
        this.showForm = true;
        if (type === 'customer') this.createCustomerForm();
        if (type === 'product') this.createProductForm();
        if (type === 'approval') this.createApprovalForm();
    }

    view(row: any) {
        console.log('مشاهده', row);
    }

    edit(row: any, type: 'customer' | 'product' | 'approval') {
        this.openForm(type);
        this.form.patchValue(row);
    }

    submit() {
        if (!this.form.valid) {
            this.form.markAllAsTouched();
            return;
        }

        if (this.formMode === 'customer')
            this.customerTable.push(this.form.value);
        if (this.formMode === 'product')
            this.productTable.push(this.form.value);
        if (this.formMode === 'approval')
            this.approvalTable.push(this.form.value);

        this.showForm = false;
    }

    cancel() {
        this.showForm = false;
    }

    openProductDetails(row: any) {
        this.selectedProduct = row;
        this.showProductDetails = true;
    }

    openApprovalDetails(row: any) {
        this.selectedApproval = row;
        this.showApprovalDetails = true;
    }
    openInstallmentTable() {}
}
