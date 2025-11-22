import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { LoanRefoundInformationComponent } from '../loan-refound/loan-refound-information/loan-refound-information.component';

@Component({
    selector: 'app-loan-settlment',
    imports: [
        ButtonDirective,
        LoanRefoundInformationComponent,
        NgIf,
        PrimeTemplate,
        TableModule,
        ReactiveFormsModule,
        InputText,
    ],
    templateUrl: './loan-settlment.component.html',
    styleUrl: './loan-settlment.component.scss',
})
export class LoanSettlmentComponent implements OnInit {
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
            effectiveDate: ['', Validators.required],
        });
    }

    openRefoundDialog() {
        this.showForm = true;
    }
    onCancelClick() {
        debugger;
        console.log('CANCEL FIRED');
    }
    onSubmitClick() {}
}
