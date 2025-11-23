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
    ],
    templateUrl: './loan-proposed.component.html',
    styleUrl: './loan-proposed.component.scss',
})
export class LoanProposedComponent implements OnInit {
    showForm = false;

    proposedForm!: FormGroup;
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


    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
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
            feeRate: ['']
        });
    }

    detail(data: any) {}
}

