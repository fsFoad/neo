import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitch } from 'primeng/inputswitch';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { NgClass, NgComponentOutlet, NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import {
    MatTab,
    MatTabContent,
    MatTabGroup,
    MatTabLabel,
} from '@angular/material/tabs';
import { PersianCalendarComponent } from '../../../../shared/components/persian-calendar/persian-calendar.module';
import { PlanTypesComponent } from '../plan-types/plan-types.component';
import { RepaymentPriorityComponent } from '../repayment-priority/repayment-priority.component';

@Component({
    selector: 'app-basic-information',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        InputSwitch,
        InputText,
        ButtonDirective,
        NgIf,
        MatIcon,
        MatTab,
        MatTabContent,
        MatTabGroup,
        MatTabLabel,
        NgComponentOutlet,
        NgForOf,
        PersianCalendarComponent,
        NgClass,
    ],
    templateUrl: './basic-information.component.html',
    styleUrl: './basic-information.component.scss',
})
export class BasicInformationComponent implements OnInit {
    @Output() formSubmit = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    contractForm!: FormGroup;
    selectedIndex = 0;
    tabs: any[] = [];
    // 🔹 داده‌های نمایشی برای dropdown‌ها
    contractGroupList = [
        { label: 'مشارکتی', value: 'partnership' },
        { label: 'مبادله‌ای', value: 'exchange' },
        { label: 'قرض‌الحسنه', value: 'qarz' },
    ];

    commitmentTypeList = [
        { label: 'اعتبارات اسنادی', value: 'credit' },
        { label: 'تسهیلات نقدی', value: 'cash' },
        { label: 'ضمانت‌نامه‌ها', value: 'guarantee' },
    ];

    profitCalcMethodList = [
        { label: 'روزشمار', value: 'daily' },
        { label: 'ماه‌شمار', value: 'monthly' },
        { label: 'سال‌شمار', value: 'yearly' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.contractForm = this.fb.group({
            contractCode: ['', Validators.required],
            contractTitle: ['', Validators.required],
            centralBankCode: [''],
            contractGroup: [null, Validators.required],
            profitCalculationMethod: [null, Validators.required],
            commitmentType: [null],
            status: [],
        });
        this.tabs = [
            { label: 'اطلاعات اصلی', icon: 'assignment', cmp: null },
            {
                label: 'معرفی انواع طرح',
                icon: 'description',
                cmp: PlanTypesComponent,
                inputs: { form: this.contractForm },
            },
            {
                label: 'اولویت بندی بازپرداخت',
                icon: 'security',
                cmp: RepaymentPriorityComponent,
                inputs: { form: this.contractForm },
            },

        ];
    }

    onSubmit(): void {
        if (this.contractForm.valid) {
            this.formSubmit.emit(this.contractForm.value);
            console.log('اطلاعات عقد:', this.contractForm.value);
        } else {
            this.contractForm.markAllAsTouched();
        }
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
