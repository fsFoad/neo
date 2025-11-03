import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-repayment-priority',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TableModule,
        DropdownModule,
        Checkbox,
        InputText,
        ButtonDirective,
        NgIf,
        NgFor
    ],
    templateUrl: './repayment-priority.component.html',
    styleUrl: './repayment-priority.component.scss'
})
export class RepaymentPriorityComponent implements OnInit {
    repaymentForm!: FormGroup;

    // الگوهای بازپرداخت (dropdown)
    repaymentPatternList = [
        { label: 'الگوی پیش‌فرض', value: 'default' },
        { label: 'الگوی ویژه مشتریان خاص', value: 'vip' },
        { label: 'الگوی اقساطی کوتاه‌مدت', value: 'shortTerm' }
    ];

    // داده‌های جدول
    debtsList = [
        { debtType: 'مانده بدهی بابت اصل' },
        { debtType: 'مانده بدهی بابت سود' },
        { debtType: 'مانده بدهی بابت خسارت تأخیر' },
        { debtType: 'هزینه‌های قانونی' },
        { debtType: 'کارمزد خدمات' },
        { debtType: 'هزینه‌های ترجمه و پست' },
        { debtType: 'هزینه‌های ترجمه تأخیر' }
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
    }

    // ساخت فرم داینامیک
    buildForm(): void {
        this.repaymentForm = this.fb.group({
            repaymentPattern: [null],
            priorities: this.fb.array(
                this.debtsList.map(d =>
                    this.fb.group({
                        debtType: [d.debtType],
                        rowPriority: [''],
                        columnPriority: [false]
                    })
                )
            )
        });
    }
    onSourceTypeChange(data){

    }
    get prioritiesArray(): FormArray {
        return this.repaymentForm.get('priorities') as FormArray;
    }

    onSubmit(): void {
        console.log('✅ داده نهایی فرم:', this.repaymentForm.value);
    }

    onCancel(): void {
        this.repaymentForm.reset();
    }

    goBack(): void {
        console.log('بازگشت به صفحه قبل');
    }
}
