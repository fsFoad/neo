import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitch } from 'primeng/inputswitch';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { RadioButton } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { Checkbox } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { Textarea } from 'primeng/textarea';

@Component({
    selector: 'app-loan-contract-grant',
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
    templateUrl: './loan-contract-grant.component.html',
    styleUrl: './loan-contract-grant.component.scss',
})
export class LoanContractGrantComponent implements OnInit {
    showForm = false;

    form!: FormGroup;
    productForm!: FormGroup;
    showGuaranteeDialog = false;

    guaranteeTable = [
        { type: '—', percent: '—', requiredAmount: '—', allocatedAmount: '—' },
        { type: '—', percent: '—', requiredAmount: '—', allocatedAmount: '—' },

    ];
    // جدول مشتری
    customerTable = [
        {
            customerNumber: '36911948',
            customerName: 'نام مشتری',
            nationalId: '1234567890',
            citizenship: 'ایرانی',
            type: 'حقیقی'
        }
    ];

    // جدول فروشنده
    sellerTable = [
        {
            customerNumber: '---',
            customerName: 'نام فروشنده',
            nationalId: '---',
            citizenship: '---',
            type: '---'
        }
    ];

    // جدول قرارداد
    contractTable = [
        {
            contractNumber: '1235',
            contractStatus: 'جاری',
            createdDate: '1405/01/10',
            dueDate: '1405/01/10',
            amount: '1,000,000,000',
            preReceivePercent: '10'
        }
    ];

    paymentMethods = [
        { label: 'کارت به کارت', value: 'card' },
        { label: 'واریز نقدی', value: 'cash' },
        { label: 'انتقال بانکی', value: 'bank' }
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {

        this.form = this.fb.group({
            customerNumber: [''],
            customerName: [''],
            nationalId: [''],
            citizenship: [''],
            type: ['']
        });

        this.productForm = this.fb.group({
            date: ['', Validators.required],
            paymentAmount: ['', Validators.required],
            thisStepAmount: ['', Validators.required],
            depositAccount: ['', Validators.required],
            depositTitle: ['', Validators.required],
            sheba: ['', Validators.required],
            trackingCode: ['', Validators.required],
            paymentMethod: ['', Validators.required]
        });
    }

    openProductDetails(row: any) {}
    openApprovalDetails(row: any) {}
}
