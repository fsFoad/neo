import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'app-product-collateral-info',
    imports: [
        ButtonDirective,
        TableModule,
        FormsModule,
        DropdownModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputText,
        Dialog,
    ],

    templateUrl: './product-collateral-info-component.component.html',
    styleUrl: './product-collateral-info-component.component.scss',
})
export class ProductCollateralInfoComponentComponent implements OnInit {
    @Input() form!: FormGroup;
    @Input() visible = false;
    @Output() visibleChange = new EventEmitter<boolean>();
    @Output() saveCollateral = new EventEmitter<any>();
    collateralTypeList = [
        { label: 'ملکی داخل شهر – تجاری', value: 1 },
        { label: 'اوراق بهادار – بورس', value: 2 },
        { label: 'سفته – داخل بانک', value: 3 },
        { label: 'غیرمنقول ملکی', value: 4 },
    ];
    dialogVisible = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.collateralForm = this.fb.group({
            collateralTypeId: [null, Validators.required],
            centralBankGroup: ['', Validators.required],
            collateralPercent: [null, [Validators.required, Validators.min(0)]],
        });
    }
    searchText = '';
    collateralForm!: FormGroup;

    collateralList = [
        { code: 10, title: 'سقف-داخل بانک', group: 'سفته', percent: 130 },
        {
            code: 11,
            title: 'اوراق بهادار-بورس',
            group: 'اوراق بهادار',
            percent: 130,
        },
        {
            code: 12,
            title: 'غیرمنقول-ملکی-تجاری',
            group: 'غیرمنقول ملکی',
            percent: 110,
        },
    ];

    addCollateral() {
        // 👇 در آینده: باز کردن دیالوگ برای افزودن وثیقه
        console.log('Add collateral clicked');
    }

    searchCollateral() {
        console.log('Search:', this.searchText);
    }

    removeCollateral(row: any) {
        this.collateralList = this.collateralList.filter((r) => r !== row);
    }
    // هندل دکمه‌ها
    goNext() {}
    goBack() {}
    onCancel() {}
    closeDialog() {
        this.visible = false;
        this.visibleChange.emit(false);
    }
    onSubmit() {
        if (this.collateralForm.valid) {
            this.saveCollateral.emit(this.collateralForm.value);
            this.closeDialog();
        } else {
            this.collateralForm.markAllAsTouched();
        }
    }
    showDialog() {
        this.dialogVisible = true;
    }
    onCollateralSaved(data: any) {
        console.log('وثیقه ذخیره شد:', data);
        // اینجا می‌تونی داده‌ها رو به جدول اضافه کنی
    }
}
