import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import {
    ProductInformationRequestComponent
} from './product-information-request/product-information-request.component';

@Component({
    selector: 'app-loan-request',
    imports: [
        NgIf,
        ReactiveFormsModule,
        InputText,
        DropdownModule,
        ButtonDirective,
        InputGroup,
        TableModule,
        ProductInformationRequestComponent,
    ],
    templateUrl: './loan-request.component.html',
    styleUrl: './loan-request.component.scss',
})
export class LoanRequestComponent implements OnInit {
    showForm = false;
    requestForm!: FormGroup;
    createDialogVisible = false;

    /** مرحله فعلی: 1 = فرم درخواست، 2 = فرم اطلاعات محصول */
    currentStep = 1;

    customerTypeList: [] = [];
    requestTypeList: [] = [];
    customerTable = [
        {
            customerNumber: '36911948',
            customerName: 'مهدی اکبری',
            type: 'اصلی',
        },
        {
            customerNumber: '36911998',
            customerName: 'فاطمه کامرانی',
            type: 'فرعی',
        },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.buildForms();
    }

    private buildForms(): void {
        this.requestForm = this.fb.group({
            customerNationalCode: [''],
            customerType: [''],
            effectiveDate: [''],
            requestType: [''],
        });
    }

    /** دکمه "بعدی" در والد */
    goNext() {
        this.currentStep = 2; // ✅ برو به فرزند
    }

    /** اگر خواستی از فرزند برگردی */
    goBackFromChild() {
        this.currentStep = 1;
    }

    onCancel() {}
}
