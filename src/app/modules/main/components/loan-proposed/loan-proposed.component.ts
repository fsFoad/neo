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
    ],
    templateUrl: './loan-proposed.component.html',
    styleUrl: './loan-proposed.component.scss',
})
export class LoanProposedComponent implements OnInit {
    showForm = false;

    paymentForm!: FormGroup;
    productForm!: FormGroup;
    paymentBreakdownTable = [
        { title: 'اصل', paid: '', remaining: '' },
        { title: 'سود / کارمزد', paid: '', remaining: '' },
        { title: 'خسارت تأخیر', paid: '', remaining: '' },
        { title: 'سود / کارمزد دوره تنفس', paid: '', remaining: '' },
        { title: 'سود عهده دولت', paid: '', remaining: '' },
        { title: 'جمع کل', paid: '', remaining: '' },
    ];
    contractTable = [
        {
            contractNumber: '1255',
            contractStatus: 'جاری',
            createdDate: '1400/01/10',
            dueDate: '1401/01/10',
            totalPaid: '1,000,000,000',
            branch: 'ظفر',
            depositAccount: '556912533',
        },
    ];

    customerTable = [
        {
            customerNumber: '36911948',
            customerName: 'نام مشتری',
            nationalId: '1234567890',
            citizenship: 'ایرانی',
            type: 'حقیقی',
        },
    ];
    installmentTable:[]=[]
    installmentsTables:[]=[]
    discountTable:[]=[]

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.paymentForm = this.fb.group({
            customerNumber: [''],
            customerName: [''],
            nationalId: [''],
            citizenship: [''],
            type: [''],
        });

        this.paymentForm = this.fb.group({
            date: ['', Validators.required],
            paymentAmount: ['', Validators.required],
            thisStepAmount: ['', Validators.required],
            depositAccount: ['', Validators.required],
            depositTitle: ['', Validators.required],
            sheba: ['', Validators.required],
            trackingCode: ['', Validators.required],
            paymentMethod: ['', Validators.required],
        });
    }

    openRefoundDialog() {
        this.showForm = true;
    }

    onFormCancel() {
        this.showForm = false;
    }

    onFormSubmit(product: any) {
        this.showForm = false;
    }
}

