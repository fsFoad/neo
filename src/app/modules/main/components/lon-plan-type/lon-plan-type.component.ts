import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-lon-plan-type',
    imports: [
        ReactiveFormsModule,
        TranslocoPipe,
        DropdownModule,
        TableModule,
        Dialog,
        ButtonDirective,
        InputSwitchModule,
        InputText,
    ],
    templateUrl: './lon-plan-type.component.html',
    styleUrl: './lon-plan-type.component.scss',
})
export class LonPlanTypeComponent implements OnInit {
    filterForm!: FormGroup;
    createPlanForm!: FormGroup;
    createDialogVisible = false;

    // لیست گزینه‌های نوع طرح
    loanPlanList = [
        { label: 'خرید تجهیزات', value: 'equipment' },
        { label: 'احداث کارخانه', value: 'construction' },
        { label: 'بازپرداخت بدهی', value: 'debt-repayment' },
    ];

    // داده‌های جدول طرح‌ها
    loanPlanTable = [
        { code: '2001', title: 'خرید تجهیزات', status: 'فعال' },
        { code: '2002', title: 'احداث کارخانه', status: 'غیرفعال' },
        { code: '2003', title: 'بازپرداخت بدهی', status: 'فعال' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.filterForm = this.fb.group({
            planTypeId: [null],
        });

        this.createPlanForm = this.fb.group({
            planCode: ['', Validators.required],
            planTitle: ['', Validators.required],
            englishTitle: [''],
            centralBankCode: [''],
            minInterestRate: [''],
            maxInterestRate: [''],
            minFeeRate: [''],
            maxFeeRate: [''],
            minDelayPenaltyRate: [''],
            maxDelayPenaltyRate: [''],
            maxDelayForgiveRate: [''],
            maxDiscountRate: [''],
            active: [true],
        });
    }

    // باز کردن دیالوگ ایجاد طرح جدید
    openCreateDialog() {
        this.createDialogVisible = true;
        this.createPlanForm.reset({ active: true });
    }

    // ثبت طرح جدید
    onCreateSubmit() {
        if (this.createPlanForm.valid) {
            const formValue = this.createPlanForm.value;
            const newPlan = {
                code: formValue.planCode,
                title: formValue.planTitle,
                status: formValue.active ? 'فعال' : 'غیرفعال',
            };
            this.loanPlanTable.push(newPlan);
            this.createDialogVisible = false;
        } else {
            this.createPlanForm.markAllAsTouched();
        }
    }

    // بستن دیالوگ
    onCancelDialog() {
        this.createDialogVisible = false;
    }

    // هنگام تغییر انتخاب در فیلتر
    onPlanTypeChange(event: any) {
        console.log('طرح انتخاب‌شده:', event.value);
    }

    // مشاهده جزئیات طرح
    viewPlan(row: any) {
        console.log('مشاهده طرح:', row);
    }

    // ویرایش طرح
    editPlan(row: any) {
        console.log('ویرایش طرح:', row);
    }
}
