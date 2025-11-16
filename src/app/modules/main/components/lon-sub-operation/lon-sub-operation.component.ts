import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButton } from 'primeng/radiobutton';
import { InputSwitch } from 'primeng/inputswitch';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-lon-sub-operation',
    imports: [
        NgIf,
        TableModule,
        Dialog,
        ReactiveFormsModule,
        DropdownModule,
        RadioButton,
        InputSwitch,
        ButtonDirective,
        Tooltip,
        InputText,
    ],
    templateUrl: './lon-sub-operation.component.html',
    styleUrl: './lon-sub-operation.component.scss',
})
export class LonSubOperationComponent implements OnInit {
    showForm = false;
    operationForm!: FormGroup;

    // متغیر برای کنترل نمایش دیالوگ
    createDialogVisible: boolean = false;

    // فرم برای دیالوگ ایجاد درخواست
    createRequestForm!: FormGroup;

    // داده جدول
    operationTable = [
        {
            code: '01',
            title: 'پرداخت تسهیلات',
            step: 'بررسی مدارک',
            gateway: 'درگاه بانک',
            method: 'آنلاین',
            active: 'فعال',
        },
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

        // ایجاد فرم برای دیالوگ
        this.createRequestForm = this.fb.group({
            requestTitle: ['', Validators.required],
            title: [false],
            step: [false],
            active: [],
            Title: [],
            operation: [],

        });
    }

    openCreateDialog() {
        this.showForm = true;
        this.operationForm.reset({ active: true, method: 'آنلاین' });

        // نمایش دیالوگ ایجاد
        this.createDialogVisible = true;
        this.createRequestForm.reset();
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
        // بستن دیالوگ ایجاد
        this.createDialogVisible = false;
    }

    viewSource(row: any) {
        console.log('مشاهده:', row);
    }

    editSource(row: any) {
        this.showForm = true;
        this.operationForm.patchValue(row);
    }

    // متد برای ثبت اطلاعات در دیالوگ
    onCreateSubmit() {
        if (this.createRequestForm.valid) {
            const formData = this.createRequestForm.value;

            // در اینجا می‌توانید منطق ثبت اطلاعات را پیاده‌سازی کنید
            console.log('اطلاعات ثبت شده:', formData);

            // بستن دیالوگ پس از ثبت موفق
            this.createDialogVisible = false;
        } else {
            // نمایش خطا در صورت نامعتبر بودن فرم
            this.createRequestForm.markAllAsTouched();
        }
    }

    viewPlan(data: any) {}
    editPlan(data: any) {}
}
