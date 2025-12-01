import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlanTypesComponent } from '../loan-type/plan-types/plan-types.component';
import { RepaymentPriorityComponent } from '../loan-type/repayment-priority/repayment-priority.component';
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { InputSwitch } from 'primeng/inputswitch';
import { ButtonDirective } from 'primeng/button';
import { CollateralSelectorComponent } from './collateral-selector/collateral-selector.component';
import { TableModule } from 'primeng/table';
import { TranslocoPipe } from '@ngneat/transloco';
import { Dialog } from 'primeng/dialog';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-loan-proposed',
    imports: [
        MatTabGroup,
        MatTab,
        MatIcon,
        NgClass,
        ReactiveFormsModule,
        NgIf,
        DropdownModule,
        InputText,
        InputSwitch,
        ButtonDirective,
        MatTabContent,
        MatTabLabel,
        NgForOf,
        TableModule,
        TranslocoPipe,
        Dialog,
        Tooltip,
    ],
    templateUrl: './loan-proposed.component.html',
    styleUrl: './loan-proposed.component.scss',
})
export class LoanProposedComponent implements OnInit {
    showForm = false;

    productForm!: FormGroup;
    customerTable = [
        {
            customerNumber: '36911948',
            customerName: 'نام مشتری',
            nationalId: '1234567890',
            citizenship: 'ایرانی',
            type: 'حقیقی',
        },
    ];
    productTable = [
        {
            productTitle: 'تسهیلات ازدواج',
            maxLoanAmount: 500000000,
            maxLoanDuration: 36,
            currencyType: 'ریال',
        },
        {
            productTitle: 'خرید مسکن',
            maxLoanAmount: 8000000000,
            maxLoanDuration: 120,
            currencyType: 'ریال',
        },
    ];

    /*  ngOnInit(): void {
        this.proposedForm = this.fb.group({
            amount: [''],
            profitCalcMethod: [''],
            effectiveDate: [''],
            delayPenaltyRate: [''],
            loanSubject: [''],
            creditRank: [''],
            fundingSource: [''],
            installmentCount: [''],
            installmentInterval: [''],
            repaymentDuration: [''],
            feeCollectionMethod: [''],
            gracePeriod: [''],
            feeRate: [''],
        });
    }
*/
    // فرم اصلی صفحه
    proposedForm!: FormGroup;

    // فرم داخل دیالوگ
    createSourceForm!: FormGroup;

    // وضعیت نمایش دیالوگ
    createDialogVisible = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForms();
        this.setInitialValues();
    }

    /** ساخت فرم‌ها */
    private buildForms(): void {
        this.proposedForm = this.fb.group({
            amount: [{ value: '', disabled: true }],
            profitCalcMethod: [{ value: '', disabled: true }],
            effectiveDate: [{ value: '', disabled: true }],
            delayPenaltyRate: [{ value: '', disabled: true }],
            loanSubject: [{ value: '', disabled: true }],
            creditRank: [{ value: '', disabled: true }],
            fundingSource: [{ value: '', disabled: true }],

            installmentCount: [{ value: '', disabled: true }],
            installmentInterval: [{ value: '', disabled: true }],
            repaymentDuration: [{ value: '', disabled: true }],
            feeCollectionMethod: [{ value: '', disabled: true }],
            gracePeriod: [{ value: '', disabled: true }],
            feeRate: [{ value: '', disabled: true }],
        });

        this.createSourceForm = this.fb.group({
            processType: [''],
            interestSavingMethod: [''],
            ageMin: [null],
            ageMax: [null],
            maxLoanDuration: [null],
            repeatable: [false],
            penaltyBase: [''],
            approvalValidity: [null],
            maxLoanAmount: [null],
            guaranteeCount: [null],
            maxGracePeriod: [null],
            feeCollectionMethod: [''],
            maxInstallments: [null],
        });
    }

    /** اگر خواستی مقدار اولیه فرم‌ها رو از API ست کنی اینجا انجام بده */
    private setInitialValues(): void {
        // مثال
        this.proposedForm.patchValue({
            amount: '1,000,000,000',
            profitCalcMethod: 'روش ساده',
            effectiveDate: '1403/01/01',
            delayPenaltyRate: '12%',
            loanSubject: 'خرید مسکن',
            creditRank: 'A',
            fundingSource: 'منابع داخلی',
            installmentCount: '60',
            installmentInterval: 'ماهانه',
            repaymentDuration: '5 سال',
            feeCollectionMethod: 'در ابتدای تسهیلات',
            gracePeriod: '30 روز',
            feeRate: '4%',
        });
    }

    /** مقدارهایی که در دیالوگ نمایش داده می‌شوند (binding: formValues.*) */
    get formValues(): ProductDetail {
        return this.createSourceForm.value as ProductDetail;
    }

    /** کلیک روی دکمه «جزئیات» در جدول محصول */
    detail(row: ProductRow): void {
        // پر کردن فرم دیالوگ با اطلاعات همان ردیف
        this.createSourceForm.patchValue({
            processType: row.processType,
            interestSavingMethod: row.interestSavingMethod,
            ageMin: row.ageMin,
            ageMax: row.ageMax,
            maxLoanDuration: row.maxLoanDuration,
            repeatable: row.repeatable,
            penaltyBase: row.penaltyBase,
            approvalValidity: row.approvalValidity,
            maxLoanAmount: row.maxLoanAmount,
            guaranteeCount: row.guaranteeCount,
            maxGracePeriod: row.maxGracePeriod,
            feeCollectionMethod: row.feeCollectionMethod,
            maxInstallments: row.maxInstallments,
        });

        this.createDialogVisible = true;
    }
}

interface CustomerRow {
    customerNumber: string;
    customerName: string;
    nationalId: string;
    citizenship: string;
    type: string;
}
interface ProductDetail {
    processType: string;           // نوع فرآیند
    interestSavingMethod: string;  // روش نگهداری سود تنفسی
    ageMin: number;                // محدوده سنی/سابقه از
    ageMax: number;                // محدوده سنی/سابقه تا
    maxLoanDuration: number;       // حداکثر مدت تسهیلات (ماه)
    repeatable: boolean;           // قابلیت پرداخت مجدد
    penaltyBase: string;           // مبنای محاسبه خسارت تأخیر
    approvalValidity: number;      // مدت اعتبار مصوبه (روز)
    maxLoanAmount: number;         // حداکثر مبلغ تسهیلات (ریال)
    guaranteeCount: number;        // تعداد ضامن مورد نیاز
    maxGracePeriod: number;        // حداکثر مهلت تنفس (روز)
    feeCollectionMethod: string;   // روش وصول کارمزد
    maxInstallments: number;       // حداکثر تعداد اقساط
}
interface ProductRow extends ProductDetail {
    productTitle: string;          // عنوان محصول
    currencyType: string;          // نوع ارز
}
