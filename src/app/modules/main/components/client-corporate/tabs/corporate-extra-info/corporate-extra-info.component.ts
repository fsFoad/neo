import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-corporate-extra-info',
    imports: [
        DropdownModule,
        InputText,
        ReactiveFormsModule,
        TranslocoPipe,
        PersianCalendarComponent,
    ],
    templateUrl: './corporate-extra-info.component.html',
    styleUrl: './corporate-extra-info.component.scss',
})
export class CorporateExtraInfoComponent implements OnInit {

    basicForm!: FormGroup;

    // نمونه دیتا برای Dropdown
    publicBudgetOptions: SelectItem[] = [
        { label: 'بلی', value: true },
        { label: 'خیر', value: false }
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.basicForm = this.fb.group({
            shortName: [''],
            shortNameEn: [''],

            officialNewspaperNo: [''],
            officialNewspaperDate: [''],
            officialNewspaperPage: [''],

            establishmentLicenseNo: [''],
            establishmentLicenseDate: [''],

            foundationDate: [''],

            officialAnnouncementNo: [''],
            officialAnnouncementDate: [''],

            workStartDate: [''],

            usePublicBudget: [''],
            publicBudgetCode: [''],

            branchCount: [''],
        });
    }

    // میتونی متد submit اضافه کنی
    onSubmit(): void {
        if (this.basicForm.valid) {
            console.log('Form Value:', this.basicForm.value);
        } else {
            console.log('Form Invalid');
        }
    }
}
