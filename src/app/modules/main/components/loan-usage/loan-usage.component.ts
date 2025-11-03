import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonDirective } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputText } from 'primeng/inputtext';
import { InputSwitch } from 'primeng/inputswitch';
import { NgIf, NgFor } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { Checkbox } from 'primeng/checkbox';

@Component({
    selector: 'app-loan-usage',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TableModule,
        DropdownModule,
        ButtonDirective,
        Dialog,
        InputText,
        TranslocoPipe,
        Checkbox,
    ],
    templateUrl: './loan-usage.component.html',
    styleUrl: './loan-usage.component.scss',
})
export class LoanUsageComponent implements OnInit {
    fundingSourcesForm!: FormGroup;
    createSourceForm!: FormGroup;
    createDialogVisible = false;
    loanGoalList = [
        { label: 'خرید تجهیزات', value: 'equipment' },
        { label: 'سرمایه در گردش', value: 'working-capital' },
        { label: 'احداث واحد تولیدی', value: 'construction' },
        { label: 'بازپرداخت بدهی', value: 'debt-repayment' },
    ];

    loanGoalTable = [
        { code: '2001', title: 'خرید تجهیزات', status: 'فعال' },
        { code: '2002', title: 'احداث کارخانه', status: 'غیرفعال' },
        { code: '2003', title: 'بازپرداخت بدهی', status: 'فعال' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.fundingSourcesForm = this.fb.group({
            sourceTypeId: [null],
        });

        this.createSourceForm = this.fb.group({
            purposeCode: ['', Validators.required],
            purposeTitle: ['', Validators.required],
        });
    }

    openCreateDialog() {
        this.createDialogVisible = true;
        this.createSourceForm.reset({ active: true });
    }

    onCreateSubmit() {
        if (this.createSourceForm.valid) {
            const newSource = this.createSourceForm.value;
            newSource.active = newSource.active ? 'فعال' : 'غیرفعال';
            this.loanGoalTable.push(newSource);
            this.createDialogVisible = false;
        } else {
            this.createSourceForm.markAllAsTouched();
        }
    }

    onCancelDialog() {
        this.createDialogVisible = false;
    }

    onSourceTypeChange(event: any) {
        console.log('نوع منبع انتخاب‌شده:', event.value);
    }

    viewSource(row: any) {
        console.log('مشاهده:', row);
    }

    editSource(row: any) {
        console.log('ویرایش:', row);
    }
}
