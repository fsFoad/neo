import { Component, DestroyRef, OnInit, inject, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {
    NonNullableFormBuilder,
    FormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { InputText } from 'primeng/inputtext';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { TranslocoPipe } from '@ngneat/transloco';
import { IdentityInfo } from '../../domain/models/identity-info.model';
import { Subscription } from 'rxjs';
import { DropdownModule } from 'primeng/dropdown';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { NgIf } from '@angular/common';
import {MatTooltip} from "@angular/material/tooltip";
import {ButtonDirective} from "primeng/button";
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NeobankService } from '../../../../services/neobank.service';

@Component({
    selector: 'app-citizen-identity-info',
    imports: [
        InputText,
        ReactiveFormsModule,
        TranslocoPipe,
        DropdownModule,
        PersianCalendarComponent,
        NgIf,
        FormsModule,
        MatTooltip,
        ButtonDirective,
        MatButton,
        MatIcon,

    ],
    templateUrl: './citizen-identity-info.component.html',
    styleUrl: './citizen-identity-info.component.scss',
})
export class CitizenIdentityInfoComponent implements OnInit, OnDestroy {
    @Input() disabled = false;
    @Input() onValueChange?: (val: any) => void;
    @Input() onValidityChange?: (valid: boolean) => void;
    @Output() valueChange = new EventEmitter<any>();
    @Output() validityChange = new EventEmitter<boolean>();

    identityFg!: FormGroup;
    nationalCodeSearch: number = null;
    loadingInquiry: boolean = false;
    birthDateSearch: number = null;
    countryIsIran: boolean = true;
    private sub = new Subscription();

    genderOptions = [
        { label: 'مرد', value: 'male' },
        { label: 'زن', value: 'female' }
    ];

    identityTypeOptions = [
        { label: 'شناسنامه', value: 1 },
        { label: 'کارت ملی', value: 2 }
    ];

    countryOptions = [
        { label: 'ایران', value: 1 },
        { label: 'ترکیه', value: 2 }
    ];

    cityOptions = [
        { label: 'تهران', value: 101 },
        { label: 'اصفهان', value: 102 }
    ];

    residenceTypeOptions = [
        { label: 'ایرانی', value: 'iranian' },
        { label: 'اتباع', value: 'foreigner' }
    ];

    aliveOptions = [
        { label: 'زنده', value: true },
        { label: 'فوت‌شده', value: false }
    ];

    constructor(
        private fb: FormBuilder,
        private neobankService:NeobankService
    ) {
        this.identityFg = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            fatherName: ['', Validators.required],
            nationalId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            birthDate: ['', Validators.required],
            gender: ['', Validators.required],
            identityNumber: ['', Validators.required],
            identityAlphabeticPart: ['', [Validators.required, Validators.maxLength(2)]],
            identityNumericPart: ['', [Validators.required, Validators.maxLength(3)]],
            identitySerial: ['', [Validators.required, Validators.maxLength(6)]],
            identityTypeId: ['', Validators.required],
            identityIssueCityId: ['', Validators.required],
            identityIssueRegion: [''],
            identityDate: ['', Validators.required],
            birthCountryId: ['', Validators.required],
            birthCityId: [''],
            residenceType: ['', Validators.required],
            nationalCardSerial: ['', Validators.required],
            isAlive: [true],
            shahabCode: ['']
        });
    }
    onSearch() {
        console.log('Search Params:', this.identityFg.value);
    }

    onInquiry() {
        if (this.identityFg.valid) {
            console.log('Inquiry Data:', this.identityFg.value);
        } else {
            this.identityFg.markAllAsTouched();
        }
    }
    ngOnInit(): void {
        this.buildForm();
        if (this.disabled) {
            this.identityFg.disable({ emitEvent: false });
        }
        this.sub.add(this.identityFg.valueChanges.subscribe(() => {
                const val = this.identityFg.getRawValue();
                const valid = this.identityFg.valid;
                this.valueChange.emit(val);
                this.validityChange.emit(valid);
                if (this.onValueChange) {
                    this.onValueChange(val);
                }
                if (this.onValidityChange) {
                    this.onValidityChange(valid);
                }
            }));
        this.countryIsIran = this.identityFg.get('birthCountryId').value === 500;
        //this.neobankService.fetchRetriveclientinfo()
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private buildForm(): void {
        this.identityFg = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            fatherName: ['', Validators.required],
            nationalId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            birthDate: ['', Validators.required],
            gender: ['', Validators.required],
            identityNumber: ['', Validators.required],
            identityAlphabeticPart: ['', [Validators.required, Validators.maxLength(2)]],
            identityNumericPart: ['', [Validators.required, Validators.maxLength(3)]],
            identitySerial: ['', [Validators.required, Validators.maxLength(6)]],
            identityTypeId: ['', Validators.required],
            identityIssueCityId: ['', Validators.required],
            identityIssueRegion: [''],
            identityDate: ['', Validators.required],
            birthCountryId: ['', Validators.required],
            birthCityId: [''],
            residenceType: ['', Validators.required],
            nationalCardSerial: ['', Validators.required],
            isAlive: [''],
            shahabCode: [''],
        });
    }
}
