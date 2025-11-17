import { Component, Input, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { MatTooltip } from '@angular/material/tooltip';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { NgIf } from '@angular/common';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';

@Component({
    selector: 'app-corporate-basic-info',
    imports: [
        ButtonDirective,
        Checkbox,
        DropdownModule,
        FormsModule,
        InputText,
        MatTooltip,
        PrimeTemplate,
        ReactiveFormsModule,
        TableModule,
        Tooltip,
        TranslocoPipe,
        NgIf,
        PersianCalendarComponent,
    ],
    templateUrl: './corporate-basic-info.component.html',
    styleUrl: './corporate-basic-info.component.scss',
})
export class CorporateBasicInfoComponent implements OnInit {
    @Input() disabled: boolean = false;
    @Input() onValueChange: any;
    @Input() onValidityChange: any;

    typeOfCitizenshipList = [
        { label: 'ایرانی', value: 'iranian' },
        { label: 'اتباع خارجی', value: 'foreigner' },
    ];

    typeOfOwnershipList = [
        { label: 'خصوصی', value: 'private' },
        { label: 'دولتی', value: 'government' },
    ];

    typeOfCustomerList = [
        { label: 'حقیقی', value: 'real' },
        { label: 'حقوقی', value: 'legal' },
    ];

    typeOfCompanyList = [
        { label: 'سهامی خاص', value: 'privateJointStock' },
        { label: 'مسئولیت محدود', value: 'llc' },
        { label: 'سهامی عام', value: 'publicJointStock' },
    ];
    dissolutionStatusList = [
        { label: 'فعال', value: 'active' },
        { label: 'منحل شده', value: 'dissolved' },
        { label: 'در حال انحلال', value: 'dissolving' }
    ];

    companyTypeList = [
        { label: 'سهامی خاص', value: 'privateJointStock' },
        { label: 'سهامی عام', value: 'publicJointStock' },
        { label: 'مسئولیت محدود', value: 'limitedLiability' },
        { label: 'تعاونی', value: 'cooperative' }
    ];
    registrationAreaList = [
        { label: 'تهران', value: 'tehran' },
        { label: 'اصفهان', value: 'isfahan' },
    ];

    ownershipStatusList = [
        { label: 'فعال', value: 'active' },
        { label: 'غیرفعال', value: 'inactive' },
    ];

    customerCoverageList = [
        { label: 'تحت پوشش', value: true },
        { label: 'خارج از پوشش', value: false },
    ];

    companyNationalityList = [
        { label: 'ایرانی', value: 'iranian' },
        { label: 'خارجی', value: 'foreign' },
    ];


    basicForm = this.fb.group({
        registrationArea: [''],        // محل ثبت
        ownershipStatus: [''],         // وضعیت
        customerCoverage: [''],        // تحت پوشش
        companyNationality: [''],      // ملیت
        englishName: [''],  // نام انگلیسی
        nationalCode: [''],
        nationalCodeDisplay: [{ value: '', disabled: true }],
        shahabCode: [{ value: '', disabled: true }],
        dissolutionStatus: [{ value: '', disabled: true }],
        firstName: [{ value: '', disabled: true }],
        registrationNumber: [{ value: '', disabled: true }],
        registrationDate: [{ value: '', disabled: true }],
        companyType: [{ value: '', disabled: true }],
        documentConfirmed: [''],
        typeOfCustomer: [''],
        typeOfOwnership: [''],
        typeOfCitizenship: [''],
        typeOfCompany: [''],
    });

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}
    onSearch() {}
}
