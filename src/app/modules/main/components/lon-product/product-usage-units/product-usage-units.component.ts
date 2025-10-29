import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RadioButton } from 'primeng/radiobutton';

@Component({
    selector: 'app-product-usage-units',
    imports: [Checkbox, ReactiveFormsModule, FormsModule,NgForOf,NgFor,CommonModule,
        TableModule,
        DropdownModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        ],
    templateUrl: './product-usage-units.component.html',
    styleUrl: './product-usage-units.component.scss',
})
export class ProductUsageUnitsComponent implements OnInit {
    @Input() form!: FormGroup;
    @Output() saveUnits = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    searchText = '';
    unitForm!: FormGroup;

    // 🔹 لیست واحدها (می‌تونه از API هم بیاد)
    unitsList = [
        { id: 1, name: 'مدیریت استان تهران', selected: true },
        { id: 2, name: 'مدیریت غرب استان تهران', selected: true },
        { id: 3, name: 'مدیریت شرق استان تهران', selected: true },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        this.unitForm = this.fb.group({
            units: this.fb.array(
                this.unitsList.map((u) => this.createUnitGroup(u))
            ),
        });
    }

    // ساخت هر فرم واحد
    createUnitGroup(unit: any): FormGroup {
        return this.fb.group({
            id: [unit.id],
            name: [unit.name],
            selected: [unit.selected],
        });
    }

    // getter برای دسترسی به FormArray
    get units(): FormArray {
        return this.unitForm.get('units') as FormArray;
    }

    // فیلتر برای جستجو
    get filteredUnits() {
        if (!this.searchText.trim()) return this.units.controls;
        return this.units.controls.filter((ctrl) =>
            ctrl.value.name.includes(this.searchText.trim())
        );
    }

    // ثبت فرم
    onSubmit() {
        if (this.unitForm.valid) {
            const selectedUnits = this.unitForm.value.units.filter(
                (u: any) => u.selected
            );
            this.saveUnits.emit(selectedUnits);
            console.log('✅ واحدهای انتخاب‌شده:', selectedUnits);
        }
    }

    onCancel() {
        this.cancel.emit();
    }

    goNext() {
        console.log('➡️ ادامه...');
    }

    goBack() {
        console.log('⬅️ بازگشت...');
    }
}
