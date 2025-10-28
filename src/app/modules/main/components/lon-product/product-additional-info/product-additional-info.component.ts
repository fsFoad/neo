import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-product-additional-info',
    imports: [DropdownModule, ReactiveFormsModule, InputText, ButtonDirective],
    templateUrl: './product-additional-info.component.html',
    styleUrl: './product-additional-info.component.scss',
})
export class ProductAdditionalInfoComponent implements OnInit {
    @Input() form!: FormGroup;

    /** ایونت‌های ناوبری */
    @Output() next = new EventEmitter<void>();
    @Output() back = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    // Dropdown data
    feeCollectionMethods = [
        { label: 'نقدی هنگام پرداخت', value: 'upfront' },
        { label: 'تقسیط همراه اقساط', value: 'installments' },
        { label: 'دریافت در انتهای دوره', value: 'endOfTerm' },
    ];

    graceProfitRetentionMethods = [
        { label: 'ثبت سود به‌صورت تعهدی', value: 'accrual' },
        { label: 'انتقال سود به انتهای دوره', value: 'defer' },
        { label: 'عدم محاسبه سود (اختیاری)', value: 'none' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // اگر کنترل‌ها از قبل نبودند، روی فرم والد اضافه کن
        const ensure = (name: string, ctrl: any) => {
            if (!this.form.get(name)) this.form.addControl(name, ctrl);
        };

        ensure(
            'maxInstallments',
            this.fb.control<number | null>(null, [Validators.min(1)])
        );
        ensure(
            'installmentIntervalMo',
            this.fb.control<number | null>(null, [Validators.min(1)])
        );
        ensure(
            'installmentsDurationD',
            this.fb.control<number | null>(null, [Validators.min(1)])
        );
        ensure('feeCollectionMethod', this.fb.control<string | null>(null)); // اختیاری
        ensure(
            'maxGraceDays',
            this.fb.control<number | null>(null, [Validators.min(0)])
        );
        ensure('graceProfitMethod', this.fb.control<string | null>(null)); // اختیاری
    }

    // هندل دکمه‌ها
    goNext() {
        this.next.emit();
    }
    goBack() {
        this.back.emit();
    }
    onCancel() {
        this.cancel.emit();
    }
}
