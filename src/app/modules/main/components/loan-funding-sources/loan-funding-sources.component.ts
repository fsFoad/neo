import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
    selector: 'app-loan-funding-sources',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TableModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        ButtonModule,
        CheckboxModule,
        TranslocoPipe,
        Checkbox,
    ],

    templateUrl: './loan-funding-sources.component.html',
    styleUrls: ['./loan-funding-sources.component.scss'],
})
export class LoanFundingSourcesComponent implements OnInit {
    fundingSourcesForm!: FormGroup;
    createSourceForm!: FormGroup;
    createDialogVisible = false;

    sourceTypeList = [
        { label: 'منابع داخلی', value: 'internal' },
        { label: 'منابع سپرده‌ای', value: 'deposit' },
        { label: 'منابع بین‌بانکی', value: 'interbank' },
        { label: 'منابع خارجی', value: 'external' },
    ];
    fundingSourcesTable = [
        { code: '1001', title: 'منابع داخلی', active: 'فعال' },
        { code: '1002', title: 'منابع سپرده‌ای', active: 'غیرفعال' },
        { code: '1003', title: 'منابع بین‌بانکی', active: 'فعال' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.fundingSourcesForm = this.fb.group({
            sourceTypeId: [null],
        });

        this.createSourceForm = this.fb.group({
            code: ['', Validators.required],
            title: ['', Validators.required],
            active: [false],
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
            this.fundingSourcesTable.push(newSource);
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

