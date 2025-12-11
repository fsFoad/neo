import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { NgForOf } from '@angular/common';
import { PersianCalendarComponent } from '../../../../shared/components/persian-calendar/persian-calendar.module';
import { RadioButton } from 'primeng/radiobutton';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Textarea } from 'primeng/textarea';

@Component({
    selector: 'app-register-product-client',
    imports: [
        ButtonDirective,
        DropdownModule,
        InputText,
        NgForOf,
        PersianCalendarComponent,
        RadioButton,
        ReactiveFormsModule,
        Textarea,
    ],
    standalone: true,
    templateUrl: './register-product-client.component.html',
    styleUrl: './register-product-client.component.scss',
})
export class RegisterProductClientComponent {
    form!: FormGroup;
    depositAccountGroups: Option[] = [
        { label: 'گروه ۱', value: 1 },
        { label: 'گروه ۲', value: 2 },
    ];

    currencyTypes: Option[] = [
        { label: 'ریال', value: 'IRR' },
        { label: 'دلار', value: 'USD' },
    ];
    onCreate(): void {
        this.form.reset({
            status: 'ACTIVE',
        });
    }

    onEdit(): void {
        // اینجا بر اساس ردیف انتخاب‌شده، فرم را با داده‌ها پر کن
    }

    onDelete(): void {
        // حذف محصول انتخاب‌شده
    }

    showTariffDetails(key: string): void {
        // نمایش دیالوگ/صفحه‌ی جزئیات تعرفه
        console.log('show details for', key, this.form.get(key)?.value);
    }

    onCancel(): void {
        // بسته‌شدن فرم یا برگشت به صفحه قبل
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        console.log('form value', this.form.value);
    }
}
interface Option {
    label: string;
    value: any;
}

interface TariffRow {
    key: string;
    label: string;
    options: Option[];
}
