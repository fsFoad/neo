import { Component } from '@angular/core';
import {  Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Button, ButtonDirective } from 'primeng/button';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';

@Component({
    selector: 'app-corporate-documents-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        TranslocoModule,
        InputText,
        DropdownModule,
        Button,
        ButtonDirective,
        PersianCalendarComponent,
    ],
    templateUrl: './citizen-documents-info.component.html',
    styleUrls: ['./citizen-documents-info.component.scss'],
})
export class CitizenDocumentsInfoComponent {
    @Input() disabled = false;
    @Input() onValueChange: (payload: {
        documentLists: DocumentItem[];
    }) => void = () => {};
    @Input() onValidityChange: (valid: boolean) => void = () => {};

    form!: FormGroup;

    // آپشن‌ها — بعداً از سرویس/استور پر می‌کنیم
    documentTypeOptions = [
        { label: 'شناسنامه', value: 1 },
        { label: 'کارت ملی', value: 2 },
        { label: 'گواهینامه', value: 3 },
        { label: 'کارت پایان خدمت', value: 4 },
        { label: 'سایر', value: 99 },
    ];
    countryOptions = [
        { label: 'ایران', value: 500 },
        { label: 'ترکیه', value: 231 },
    ];
    cityOptions = [
        { label: 'تهران', value: 22 },
        { label: 'مشهد', value: 51 },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            documents: this.fb.array([]),
        });

        if (this.disabled) {
            this.form.disable({ emitEvent: false });
        }

        // یک ردیف نمونه
        this.addDocument();

        // پخش تغییرات
        this.form.valueChanges.subscribe(() => this.emitChanges());
        this.emitChanges();
    }

    ngOnDestroy(): void {
        // سابسکریپشن مجزا نداریم
    }

    get documentsFa(): FormArray {
        return this.form.get('documents') as FormArray;
    }

    addDocument(prefill?: Partial<DocumentItem>): void {
        const g = this.fb.group({
            documentTypeId: [
                prefill?.documentTypeId ?? null,
                Validators.required,
            ],
            documentNumber: [
                prefill?.documentNumber ?? '',
                Validators.maxLength(50),
            ],
            issueDate: [prefill?.issueDate ?? null], // YYYYMMDD
            expirationDate: [prefill?.expirationDate ?? null], // YYYYMMDD
            issuer: [prefill?.issuer ?? '', Validators.maxLength(100)],
            countryId: [prefill?.countryId ?? 500],
            cityId: [prefill?.cityId ?? null],
            description: [
                prefill?.description ?? '',
                Validators.maxLength(200),
            ],
            fileName: [prefill?.fileName ?? null],
            file: [prefill?.file ?? null],
            operationFlag: [prefill?.operationFlag ?? 'I'],
        });

        this.documentsFa.push(g);
        this.emitChanges();
    }

    removeDocument(i: number): void {
        this.documentsFa.removeAt(i);
        this.emitChanges();
    }

    onPickFile(event: Event, index: number): void {
        const input = event.target as HTMLInputElement;
        const file = input.files && input.files[0] ? input.files[0] : null;

        const row = this.documentsFa.at(index);
        if (row) {
            row.get('file')?.setValue(file);
            row.get('fileName')?.setValue(file ? file.name : null);
            row.markAsDirty();
            this.emitChanges();
        }
    }

    private emitChanges(): void {
        const payload = {
            documentLists: this.documentsFa.getRawValue() as DocumentItem[],
        };
        this.onValueChange(payload);
        this.onValidityChange(this.form.valid);
    }
}

type OpFlag = 'I' | 'U' | 'D';

export interface DocumentItem {
    documentId?: number | null;
    documentTypeId: number | null;
    documentNumber: string;
    issueDate: number | null;       // YYYYMMDD (جلالی)
    expirationDate: number | null;  // YYYYMMDD (جلالی)
    issuer: string;
    countryId: number | null;
    cityId: number | null;
    description: string;

    // فایل جهت آپلود (برای ارسال واقعی بعداً multipart می‌سازی)
    fileName: string | null;
    file?: File | null;

    operationFlag: OpFlag;
}
