import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { LoanRefoundInformationComponent } from './loan-refound-information/loan-refound-information.component';

@Component({
    selector: 'app-loan-refound',
    imports: [
        ReactiveFormsModule,
        TableModule,
        DropdownModule,
        ButtonDirective,
        NgIf,
        LoanRefoundInformationComponent,
    ],
    templateUrl: './loan-refound.component.html',
    styleUrl: './loan-refound.component.scss',
})
export class LoanRefoundComponent implements OnInit {
    showForm = false;

    form!: FormGroup;
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

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            customerNumber: [''],
            customerName: [''],
            nationalId: [''],
            citizenship: [''],
            type: [''],
        });

        this.productForm = this.fb.group({
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
