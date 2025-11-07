import { Component } from '@angular/core';
import { EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Button, ButtonDirective } from 'primeng/button';
import { TranslocoPipe } from '@ngneat/transloco';
import {PersianCalendarComponent} from "../../../../../shared/components/persian-calendar/persian-calendar.module";
import { MatTooltip } from '@angular/material/tooltip';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';


@Component({
    selector: 'app-citizen-education-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        InputText,
        DropdownModule,
        Button,
        ButtonDirective,
        TranslocoPipe,
        PersianCalendarComponent,
        MatTooltip,
        TableModule,
        Tooltip,
        Checkbox,
        Dialog,
    ],
    templateUrl: './citizen-education-info.component.html',
    styleUrls: ['./citizen-education-info.component.scss'],
})
export class CitizenEducationInfoComponent implements OnInit, OnDestroy {
    @Input() disabled = false;
    @Output() valueChange = new EventEmitter<{
        clientEucationtInfoLists: EducationItem[];
    }>();
    @Output() validityChange = new EventEmitter<boolean>();
    form!: FormGroup;
    EducationTable: any[] = [];
    visibleEducate = false;
    degreeOptions = [
        { label: 'دیپلم', value: 1 },
        { label: 'کاردانی', value: 2 },
        { label: 'کارشناسی', value: 3 },
        { label: 'کارشناسی ارشد', value: 4 },
        { label: 'دکتری', value: 5 },
    ];

    majorOptions = [
        { label: 'کامپیوتر', value: 100 },
        { label: 'حقوق', value: 101 },
        { label: 'اقتصاد', value: 102 },
        { label: 'مدیریت', value: 103 },
    ];

    countryOptions = [
        { label: 'ایران', value: 500 },
        { label: 'ترکیه', value: 231 },
    ];

    cityOptions = [
        { label: 'تهران', value: 22 },
        { label: 'مشهد', value: 51 },
    ];

    ngOnInit(): void {
        this.form = this.fb.group({
            educations: this.fb.array([]),
        });

        if (this.disabled) {
            this.form.disable({ emitEvent: false });
        }



        // انتشار تغییرات
        this.form.valueChanges.subscribe(() => this.emitChanges());
        // وضعیت اولیه
        this.emitChanges();
    }
    closeEducate() { this.visibleEducate = false; }
    submitEducate() {
        // TODO: ارسال فرم
        this.closeEducate();
    }
    ngOnDestroy(): void {
        // چون از Subscription جداگانه استفاده نکردیم، چیزی برای unsubscribe نیست
    }

    get educationsFa(): FormArray {
        return this.form.get('educations') as FormArray;
    }

    addEducation(prefill?: Partial<EducationItem>): void {
 this.visibleEducate=true
    }

    removeEducation(i: number): void {
        this.educationsFa.removeAt(i);
        this.emitChanges();
    }

    private emitChanges(): void {
        const payload = {
            clientEucationtInfoLists:
                this.educationsFa.getRawValue() as EducationItem[],
        };
        this.valueChange.emit(payload);
        this.validityChange.emit(this.form.valid);
    }

    constructor(private fb: FormBuilder) {}
}
type OpFlag = 'I' | 'U' | 'D';

export interface EducationItem {
    clientId?: number | null;          // اگر لازم شد
    majorId: number | null;
    degreeId: number | null;
    fieldOfInterest: string;
    academyId: number | null;
    academyName: string;
    academyCityId: number | null;
    certificateNumber: string;
    startDate: number | null;          // سال جلالی مثل 1398 (فعلاً 4 رقمی)
    endDate: number | null;            // سال جلالی 4 رقمی
    academyCountryId: number | null;
    operationFlag: OpFlag;
}


