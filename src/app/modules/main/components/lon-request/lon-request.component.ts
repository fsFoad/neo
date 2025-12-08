import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-lon-request',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        TableModule,
        Dialog,
        ButtonDirective,
        InputSwitchModule,
        Tooltip,
    ],
    templateUrl: './lon-request.component.html',
    styleUrl: './lon-request.component.scss',
})
export class LonRequestComponent implements OnInit {
    // فرم جستجو
    filterForm!: FormGroup;

    // فرم ایجاد نوع درخواست جدید
    createRequestForm!: FormGroup;

    // کنترل باز/بسته بودن دیالوگ ایجاد
    createDialogVisible = false;

    // داده‌های کشویی برای فیلتر (مطابق HTML)
    requestTypeList = [
        { label: 'تسهیلات انفرادی', value: 'individual-loan' },
        { label: 'تسهیلات گروهی', value: 'group-loan' },
        { label: 'وجوه اداره شده', value: 'managed-funds' },
    ];

    // داده‌های جدول نوع درخواست‌ها
    requestTypeTable = [
        { title: 'تسهیلات انفرادی', status: 'فعال' },
        { title: 'تسهیلات گروهی', status: 'فعال' },
        { title: 'وجوه اداره شده', status: 'فعال' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // مقداردهی فرم فیلتر
        this.filterForm = this.fb.group({
            requestTypeId: [null],
        });

        // مقداردهی فرم ایجاد نوع درخواست جدید
        this.createRequestForm = this.fb.group({
            requestCode: ['', Validators.required],
            requestTitle: ['', Validators.required],
            active: [true],
        });
    }

    /** =============================
     *  متدهای متصل به HTML
     *  ============================= */

    // متد تغییر انتخاب در منوی کشویی فیلتر
    onRequestTypeChange(event: any) {
        console.log('نوع درخواست انتخاب‌شده:', event.value);
    }

    // متد باز کردن دیالوگ ایجاد نوع درخواست جدید
    openCreateDialog() {
        this.createDialogVisible = true;
        this.createRequestForm.reset({ active: true });
    }

    // متد ثبت نوع درخواست جدید
    onCreateSubmit() {
        if (this.createRequestForm.valid) {
            const formValue = this.createRequestForm.value;
            const newRequest = {
                title: formValue.requestTitle,
                status: formValue.active ? 'فعال' : 'غیرفعال',
            };

            this.requestTypeTable.push(newRequest);
            console.log('نوع درخواست جدید ثبت شد:', newRequest);

            this.createDialogVisible = false;
        } else {
            this.createRequestForm.markAllAsTouched();
            console.warn('⚠️ فرم ایجاد نوع درخواست معتبر نیست');
        }
    }

    // متد بستن دیالوگ
    onCancelDialog() {
        this.createDialogVisible = false;
        console.log('ایجاد نوع درخواست لغو شد');
    }

    // متد مشاهده جزئیات نوع درخواست
    viewRequest(row: any) {
        console.log('🔍 مشاهده نوع درخواست:', row);
    }

    // متد ویرایش نوع درخواست
    editRequest(row: any) {
        console.log('✏️ ویرایش نوع درخواست:', row);
    }
}
