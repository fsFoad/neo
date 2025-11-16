import { Component, OnInit } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { InputSwitch } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
    selector: 'app-loan-operation',
    standalone: true,
    imports: [
        TranslocoPipe,
        TableModule,
        Tooltip,
        NgIf,
        ButtonDirective,
        ReactiveFormsModule,
        DropdownModule,
        Dialog,
        InputText,
        InputSwitch,
        RadioButtonModule
    ],
    templateUrl: './loan-operation.component.html',
    styleUrl: './loan-operation.component.scss',
})
export class LoanOperationComponent implements OnInit {
    showForm = false;
    operationForm!: FormGroup;

    // داده جدول
    operationTable = [
        { code: '01', title: 'پرداخت تسهیلات', step: 'بررسی مدارک', gateway: 'درگاه بانک', method: 'آنلاین', active: 'فعال' },
    ];

    // داده‌های دراپ‌داون‌ها
    operationSteps = [
        { label: 'ثبت درخواست', value: 'ثبت درخواست' },
        { label: 'بررسی مدارک', value: 'بررسی مدارک' },
        { label: 'تأیید نهایی', value: 'تأیید نهایی' },
    ];

    gateways = [
        { label: 'درگاه بانک', value: 'درگاه بانک' },
        { label: 'سامانه سجام', value: 'سامانه سجام' },
        { label: 'پرتال مرکزی', value: 'پرتال مرکزی' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.operationForm = this.fb.group({
            code: ['', Validators.required],
            title: ['', Validators.required],
            step: [null, Validators.required],
            gateway: [null],
            method: ['آنلاین'],
            active: [true],
        });
    }

    openCreateDialog() {
        this.showForm = true;
        this.operationForm.reset({ active: true, method: 'آنلاین' });
    }

    onSubmit() {
        if (this.operationForm.valid) {
            const value = this.operationForm.value;
            this.operationTable.push({
                code: value.code,
                title: value.title,
                step: value.step,
                gateway: value.gateway,
                method: value.method,
                active: value.active ? 'فعال' : 'غیرفعال',
            });
            this.showForm = false;
        } else {
            this.operationForm.markAllAsTouched();
        }
    }

    onCancelDialog() {
        this.showForm = false;
    }

    viewSource(row: any) {
        console.log('مشاهده:', row);
    }

    editSource(row: any) {
        this.showForm = true;
        this.operationForm.patchValue(row);
    }
    onCreateSubmit(){

    }
}
