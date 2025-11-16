import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';

@Component({
    selector: 'app-product-documents-info',
    standalone: true,
    imports: [
        CommonModule,
        TableModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        RadioButton,
    ],
    templateUrl: './product-documents-info.component.html',
    styleUrls: ['./product-documents-info.component.scss'],
})
export class ProductDocumentsInfoComponent implements OnInit {
    @Input() form!: FormGroup;
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() saveDocument = new EventEmitter<any>();
    receiveStepList = [
        { label: 'مرحله اول', value: 1 },
        { label: 'مرحله دوم', value: 2 },
        { label: 'مرحله سوم', value: 3 },
    ];

    documentList = [
        {
            code: 101,
            title: 'کارت ملی',
            type: 'اجباری',
            receiveStep: 'درخواست',
            isOriginal: true,
            needInquiry: false,
        },
        {
            code: 102,
            title: 'سند ملکی',
            type: 'اجباری',
            receiveStep: 'مصوبه',
            isOriginal: true,
            needInquiry: true,
        },
        {
            code: 103,
            title: 'فیش حقوقی',
            type: 'اجباری',
            receiveStep: 'قرارداد',
            isOriginal: false,
            needInquiry: true,
        },
    ];
    // 🔹 وضعیت نمایش دیالوگ
    dialogVisible = false;

    // 🔹 فرم دیالوگ
    documentForm!: FormGroup;

    // 🔹 لیست نوع مدرک
    documentTypeList = [
        { label: 'مدارک هویتی', value: 1 },
        { label: 'مدارک مالی', value: 2 },
        { label: 'مدارک ملکی', value: 3 },
    ];

    searchText = '';

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.documentForm = this.fb.group({
            documentTypeId: [null, Validators.required],
            receiveStepId: [null, Validators.required],
            requireType: ['اجباری'],
            documentKind: ['اصل'],
            needInquiry: ['دارد'],
        });
    }

    // 🔹 باز کردن دیالوگ
    showDialog() {
        this.dialogVisible = true;
    }

    // 🔹 بستن دیالوگ
    closeDialog() {
        this.dialogVisible = false;
        this.visibleChange.emit(false);
    }

    // 🔹 ثبت مدرک
    onSubmit() {
        if (this.documentForm.valid) {
            this.saveDocument.emit(this.documentForm.value);
            this.closeDialog();
        } else {
            this.documentForm.markAllAsTouched();
        }
    }

    // 🔹 انصراف از دیالوگ
    onCancel() {
        this.closeDialog();
    }

    // 🔹 حذف مدرک از جدول
    removeDocument(row: any) {
        this.documentList = this.documentList.filter((r) => r !== row);
    }

    // 🔹 جستجو
    searchDocument() {
        console.log('جستجو برای:', this.searchText);
    }

    // 🔹 هدایت دکمه‌ها
    goNext() {}
    goBack() {}
}
