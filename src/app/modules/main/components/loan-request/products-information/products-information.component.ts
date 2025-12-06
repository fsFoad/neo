import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PrimeTemplate } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-products-information',
    imports: [
        ButtonDirective,
        DropdownModule,
        InputGroup,
        InputText,
        PrimeTemplate,
        ReactiveFormsModule,
        TableModule,
    ],
    templateUrl: './products-information.component.html',
    styleUrl: './products-information.component.scss',
})
export class ProductsInformationComponent implements OnInit {
    productInformationForm!: FormGroup;
    selectedProduct: any = null;

    // برای دیالوگ جزئیات اگر خواستی استفاده کنی
    createDialogVisible = false;
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
        });
    }

    constructor(private fb: FormBuilder) {}
    detail(row: any): void {
        this.selectedProduct = row;

        // اینجا می‌تونی دیالوگ را باز کنی و فرم را با row پر کنی
        // this.createSourceForm.patchValue({...});
        // this.createDialogVisible = true;

        console.log('جزئیات محصول انتخاب شده:', row);
    }

    goNext() {}

    goCanceled() {}

    goBack() {}
}
