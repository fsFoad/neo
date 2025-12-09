import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PersianCalendarComponent } from '../../../../shared/components/persian-calendar/persian-calendar.module';
import { LoanRequestRejisterSuccessfullyComponent } from '../loan-request-rejister-successfully/loan-request-rejister-successfully.component';

@Component({
    selector: 'app-request-information',
    imports: [
        Dialog,
        ButtonDirective,
        ReactiveFormsModule,
        TableModule,
        InputText,
        PersianCalendarComponent,
        DropdownModule,
        FormsModule,
        NgIf,
        LoanRequestRejisterSuccessfullyComponent,
    ],
    templateUrl: './request-information.component.html',
    styleUrl: './request-information.component.scss',
})
export class RequestInformationComponent implements OnInit {
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
    ngOnInit() {
        this.productInformationForm = this.fb.group({
            productTitle: [null],
            productCode: [null],
            amount: [null],
            description: [null],
            loanSubject: [null],
            depositNumber: [null],
            relatedFileNo: [null],
            deferralCode: [null],
            article186CertificateNo: [null],
            approvalId: [null],
            sourceType: [null],
            cbiCode: [null],
            economicSubsector: [null],
            economicSector: [null],
            installmentInterval: [null],
            receiveGoal: [null],
            loanDuration: [null],
            installmentCount: [null],
            installmentMethod: [null],
        });
    }

    constructor(private fb: FormBuilder) {}
    detail(row: any): void {
        this.selectedProduct = row;
        this.showApprovalDetails = true;
    }

    goBack() {
        this.back.emit();
    }
    goNext() {
        this.currentStep = 2; // ✅ برو به فرزند
    }

    /** اگر خواستی از فرزند برگردی */
    goBackFromChild() {
        this.currentStep = 1;
    }
}
