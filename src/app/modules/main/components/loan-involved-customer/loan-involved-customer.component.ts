import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitch } from 'primeng/inputswitch';
import { InputText } from 'primeng/inputtext';
import { MatIcon } from '@angular/material/icon';
import { MatTab } from '@angular/material/tabs';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputGroup } from 'primeng/inputgroup';

@Component({
    selector: 'app-loan-involved-customer',
    imports: [
        ButtonDirective,
        DropdownModule,
        InputSwitch,
        InputText,
        MatIcon,
        MatTab,
        TableModule,
        Dialog,
        ReactiveFormsModule,
        InputGroup
    ],
    templateUrl: './loan-involved-customer.component.html',
    styleUrl: './loan-involved-customer.component.scss',
})
export class LoanInvolvedCustomerComponent implements OnInit {

    showForm = false;
    operationForm!: FormGroup;

    guaranteeTable = [
        { customerName: '—', customerNumber: '—' }
    ];
    customerTypeList = [
        { label: 'حقیقی', value: '1' },
        { label: 'حقوقی', value: '2' },
        { label: 'اتباع خارجی', value: '3' }
    ];

    relatedPersons = [
        {
            customerNumber: '12345',
            customerName: 'علی رضایی',
            role: 'ضامن',
            accountNumber: '9876543210',
            roleOrder: 1,
            participationPercent: 50
        },
        {
            customerNumber: '56789',
            customerName: 'مریم احمدی',
            role: 'همراه',
            accountNumber: '1234567890',
            roleOrder: 2,
            participationPercent: 50
        }
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {

        this.operationForm = this.fb.group({

            // فیلدهای اصلی
            customerType: ['', Validators.required],
            customerNationalCode: ['', Validators.required],

            // فیلدهای نقش
            role: ['', Validators.required],
            depositNo: ['', Validators.required],
            participationPercentage: ['', Validators.required],
            roleOrder: ['', Validators.required]
        });
    }

    openAddRoleDialog() {
        this.showForm = true;
    }

    viewSource(row: any) {
        console.log('مشاهده:', row);
    }

    editSource(row: any) {
        this.showForm = true;
        this.operationForm.patchValue(row);
    }
}
