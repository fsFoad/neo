import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { NgIf, NgForOf } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-plan-types',
    standalone: true,
    imports: [
        TableModule,
        Dialog,
        ButtonDirective,
        Checkbox,
        ReactiveFormsModule,
    ],
    templateUrl: './plan-types.component.html',
    styleUrl: './plan-types.component.scss',
})
export class PlanTypesComponent implements OnInit {
    showPlanDialog = false;
    planSelectionForm!: FormGroup;
    // لیست اصلی (اختیاری برای صفحه)
    planTypeList = [
        { planCode: '01', planTitle: 'کشاورزی' },
        { planCode: '02', planTitle: 'صنعتی' },
        { planCode: '03', planTitle: 'صنایع دستی' },
    ];

    // داده‌های نمایش در دیالوگ
    planDialogList = [
        { planCode: '01', planTitle: 'کشاورزی', selected: false },
        { planCode: '02', planTitle: 'صنعتی', selected: false },
        { planCode: '03', planTitle: 'صنایع دستی', selected: false },
        { planCode: '04', planTitle: 'معدن', selected: false },
        { planCode: '05', planTitle: 'مسکن و ساختمان', selected: false },
        { planCode: '06', planTitle: 'خدمات', selected: false },
    ];
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initForm();
    }
    // 🧱 ساخت فرم داینامیک برای لیست طرح‌ها
    initForm() {
        this.planSelectionForm = this.fb.group({
            plans: this.fb.array(
                this.planDialogList.map(() =>
                    this.fb.group({
                        selected: [false],
                    })
                )
            ),
        });
    }
    get plansArray(): FormArray {
        return this.planSelectionForm.get('plans') as FormArray;
    }
    // ✅ باز کردن دیالوگ
    openPlanDialog(): void {
        this.showPlanDialog = true;
        this.initForm(); // فرم رو بازسازی کن
    }

    // ✅ تأیید انتخاب‌ها
    confirmSelection(): void {
        const selectedPlans = this.plansArray.controls
            .map((ctrl, i) => ({
                ...this.planDialogList[i],
                selected: ctrl.value.selected,
            }))
            .filter((p) => p.selected);

        console.log('✅ طرح‌های انتخاب‌شده:', selectedPlans);
        this.showPlanDialog = false;
    }

    // ✅ بستن دیالوگ بدون ذخیره
    closePlanDialog(): void {
        this.showPlanDialog = false;
    }
}
