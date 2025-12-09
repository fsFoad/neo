import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PersianCalendarComponent } from '../../../../shared/components/persian-calendar/persian-calendar.module';

@Component({
    selector: 'app-loan-request-rejister-successfully',
    imports: [
        ButtonDirective,
        Dialog,
        DropdownModule,
        InputText,
        NgIf,
        PersianCalendarComponent,
        PrimeTemplate,
        ReactiveFormsModule,
        TableModule,
    ],
    templateUrl: './loan-request-rejister-successfully.component.html',
    styleUrl: './loan-request-rejister-successfully.component.scss',
})
export class LoanRequestRejisterSuccessfullyComponent implements OnInit {
    @Output() back = new EventEmitter<void>();
    currentStep: number = 1;
    productInformationForm!: FormGroup;
    selectedProduct: any = null;
    createDialogVisible = false;
    showApprovalDetails = false;
    selectedApproval: any = 'غیر تبصره ای /غیر دولتی';
    goalReceiveList = [];
    customerTable = [
        {
            customerNumber: '36911948',
            customerName: 'مهدی اکبری',
            customerNationalCode: '0014787841',
            tabeiyat: 'ایرانی',
            type: 'حقیقی',
        },
        {
            customerNumber: '36911948',
            customerName: 'ماری اکبری',
            customerNationalCode: '0014787841',
            tabeiyat: 'ایرانی',
            type: 'حقیقی',
        },
    ];
    productTable = [
        {
            productTitle: 'قرض الحسنه ازدواج',
            maxLoanAmount: 500000000,
            maxLoanDuration: 36,
            currencyType: 'ریال',
        },
        {
            productTitle: 'فرزندآوری',
            maxLoanAmount: 500000000,
            maxLoanDuration: 36,
            currencyType: 'ریال',
        },
        {
            productTitle: 'رفع احتیاجات ضروری',
            maxLoanAmount: 500000000,
            maxLoanDuration: 36,
            currencyType: 'ریال',
        },
    ];
    requestInformationTable = [
        {
            amount: 110000,
            installmentCount: 60,
            installmentInterval: 1,
            economicSector: 45789833121,
            description: 'ایرانی',
        },
    ];
    ngOnInit() {
        this.productInformationForm = this.fb.group({

        });
    }

    constructor(private fb: FormBuilder) {}
    detail(row: any): void {
        this.selectedProduct = row;
        this.showApprovalDetails = true;
    }
    closePage(){}
}
