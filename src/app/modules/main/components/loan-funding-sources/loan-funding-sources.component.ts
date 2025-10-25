import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import {  ButtonDirective } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { TranslocoPipe } from '@ngneat/transloco';
import { Checkbox } from 'primeng/checkbox';

interface SourceTypeOption {
    label: string;
    value: string;
}
@Component({
    selector: 'app-loan-funding-sources',
    imports: [
        NgIf,
        FormsModule,
        DropdownModule,
        TableModule,
        ButtonDirective,
        InfiniteScrollDirective,
        ReactiveFormsModule,
        TranslocoPipe,
        Checkbox,
    ],
    templateUrl: './loan-funding-sources.component.html',
    styleUrl: './loan-funding-sources.component.scss',
})
export class LoanFundingSourcesComponent implements OnInit {
    fundingSourcesForm!: FormGroup;
    easySearchFlag = true;
    ngOnInit(): void {
        this.fundingSourcesForm = this.fb.group({
            sourceType: [''],
            sourceTypeId: [null]
        });
    }

    onScrollDown() {}
    sourceTypeList: SourceTypeOption[] = [

        { label: 'منابع داخلی', value: 'internal' },
        { label: 'منابع سپرده‌ای', value: 'deposit' },
        { label: 'منابع بین‌بانکی', value: 'interbank' },
        { label: 'منابع خارجی', value: 'external' }
    ];
    fundingSourcesTable = [
        { code: '1001', title: 'منابع داخلی', active: "فعال" },
        { code: '1002', title: 'منابع سپرده‌ای', active: "غیرفعال" },
        { code: '1003', title: 'منابع بین‌بانکی', active: "فعال" },
    ];

    constructor(private fb: FormBuilder) {}

    openSourceDialog() {
        console.log('📘 انتخاب منبع تأمین کلیک شد');
        // اینجا می‌تونی dialog یا modal باز کنی
    }

    viewSource(row: any) {
        console.log('👁 مشاهده جزئیات:', row);
    }

    editSource(row: any) {
        console.log('✏️ ویرایش ردیف:', row);
    }
    onSourceTypeChange(event: any): void {
        const selectedValue = event.value;
        console.log('نوع منبع انتخاب‌شده:', selectedValue);

        // مثال: در صورت انتخاب خاص، می‌تونی عملیات خاصی انجام بدی
        if (selectedValue === 'external') {
            this.easySearchFlag = false; // مثلاً غیرفعال‌کردن فیلدی دیگر
        }
    }
}

