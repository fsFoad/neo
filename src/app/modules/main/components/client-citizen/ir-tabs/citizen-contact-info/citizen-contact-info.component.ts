import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import {MatTooltip} from "@angular/material/tooltip";
import {TableModule} from "primeng/table";
import {Tooltip} from "primeng/tooltip";
import {Dialog} from "primeng/dialog";
import {MatFormField} from "@angular/material/form-field";
import {InputTextarea} from "primeng/inputtextarea";
import { NeobankService } from '../../../../services/neobank.service';

@Component({
    selector: 'app-corporate-ir-contact-info',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslocoModule,
        // PrimeNG
        InputTextModule,
        DropdownModule,
        CheckboxModule,
        ButtonModule,
        // Calendar
        PersianCalendarComponent,
        MatTooltip,
        TableModule,
        Tooltip,
        Dialog,
        InputTextarea,
    ],
    templateUrl: './citizen-contact-info.component.html',
    styleUrls: ['./citizen-contact-info.component.scss'],
})


export class CitizenContactInfoComponent implements OnInit, OnDestroy {
    /** اگر بخوای کل تب Readonly بشه */
    @Input() disabled = false;

    /** کال‌بک‌ها برای ngComponentOutlet (اختیاری) */
    @Input() onValueChange?: (val: any) => void;
    @Input() onValidityChange?: (valid: boolean) => void;

    /** خروجی‌های استاندارد هم در صورت نیاز موجودند */
    @Output() valueChange = new EventEmitter<any>();
    @Output() validityChange = new EventEmitter<boolean>();
    formAddress: FormGroup<AddressForm> = this.fb.group<AddressForm>({
        addressType: this.fb.control<AddressTypeCode | null>(null, { validators: Validators.required }),
        provinceId:   this.fb.control<number | null>(null, { validators: Validators.required }),
        cityId:       this.fb.control<number | null>(null, { validators: Validators.required }),
        zone:         this.fb.control<string | null>(null),
        postalCode:   this.fb.control<string | null>(null, { validators: [Validators.pattern(/^\d{10}$/)] }),
        phoneNumber:  this.fb.control<string | null>(null, { validators: [Validators.pattern(/^\d{8,15}$/)] }),
        startDate:    this.fb.control<any | null>(null),
        endDate:      this.fb.control<any | null>(null),
        addressText:  this.fb.control<string | null>(null, { validators: Validators.required }),

        // 👇 این مورد کم بود
        isDefault:    this.fb.control<boolean>(false, { nonNullable: true }),
    });
    addressTypes = [
        { label: 'مسکونی', value: 'home' },
        { label: 'محل کار', value: 'work' },
        { label: 'صورتحساب', value: 'billing' },
        { label: 'ارسال', value: 'shipping' },
    ] as const;

    contactFg!: FormGroup;
    private sub = new Subscription();
    contactsTable=[]
    addressTable=[]
    visibleAddress = false;
    visibleContact = false;

    openAddress() { this.visibleAddress = true; }
    closeAddress() { this.visibleAddress = false; }
    submitAddress() {
        // TODO: ارسال فرم
        this.closeAddress();
    }
    openContact() { this.visibleContact = true; }
    closeContact() { this.visibleContact = false; }
    submitContact() {
        // TODO: ارسال فرم
        this.neobankService.createClientContactInfo(10000125).subscribe({
            next: (result) => {
                console.log('result',result);
            }
            , error: (err) => {}
        })
        this.closeContact();
    }
    // --- Options (می‌تونی از سرویس بیاری؛ فعلاً استاتیک):
    contactTypeOptions = [
        { label: 'تلفن ثابت', value: 1 as ContactType },
        { label: 'تلفن همراه', value: 2 as ContactType },
        { label: 'ایمیل', value: 3 as ContactType },
        { label: 'آدرس', value: 4 as ContactType },
        { label: 'فکس', value: 5 as ContactType },
    ];

    contactGroupOptions = [
        { label: 'شخصی', value: 1 as ContactGroupType },
        { label: 'محل کار', value: 2 as ContactGroupType },
    ];

    inhabitancyOptions = [
        { label: 'مالک', value: 1 as InhabitancyType },
        { label: 'استیجاری', value: 2 as InhabitancyType },
    ];

    provinceOptions = [
        { label: 'تهران', value: 1 },
        { label: 'خراسان رضوی', value: 2 },
    ];

    cityOptions = [
        { label: 'تهران', value: 101 },
        { label: 'مشهد', value: 201 },
    ];

    ngOnInit(): void {
        this.buildForm();

        if (this.disabled) {
            this.contactFg.disable({ emitEvent: false });
        }

        this.sub.add(
            this.contactFg.valueChanges.subscribe(() => {
                const val = this.contactFg.getRawValue();
                const valid = this.contactFg.valid;
                this.valueChange.emit(val);
                this.validityChange.emit(valid);
                if (this.onValueChange)    { this.onValueChange(val); }
                if (this.onValidityChange) { this.onValidityChange(valid); }
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // ---------- Form helpers ----------
    get contacts(): FormArray {
        return this.contactFg.get('contacts') as FormArray;
    }

    addPhone(): void {
        this.contacts.push(this.createContactGroup(1));
    }

    addMobile(): void {
        this.contacts.push(this.createContactGroup(2));
    }

    addEmail(): void {
        this.contacts.push(this.createContactGroup(3));
    }

    addAddress(): void {
        this.contacts.push(this.createContactGroup(4));
    }

    addFax(): void {
        this.contacts.push(this.createContactGroup(5));
    }

    removeAt(index: number): void {
        this.contacts.removeAt(index);
    }

    isTypeAddress(group: FormGroup): boolean {
        return group.get('contactType')?.value === 4;
    }

    isTypeEmail(group: FormGroup): boolean {
        return group.get('contactType')?.value === 3;
    }

    private buildForm(): void {
        this.contactFg = this.fb.group({
            contacts: this.fb.array<FormGroup>([]),
            fullName:[{ value: '', disabled: true }],
            nationalId:[{ value: '', disabled: true }],
            clientId:[{ value: '', disabled: true }],
        });
    }

    private createContactGroup(contactType: ContactType): FormGroup {
        // ولیدیشن‌های مشترک
        const numericPattern = /^[0-9]{8,15}$/; // تلفن/موبایل/فکس
        const postalPattern  = /^[0-9]{10}$/;   // کدپستی 10رقم

        // فیلدهای مشترک
        const g = this.fb.group({
            contactId: [0],
            contactGroupType: [1, Validators.required],
            contactType: [contactType, Validators.required],
            isDefault: [false],
            usedForAddress: [contactType === 4],  // فقط برای آدرس معنی‌دار است
            contactValue: [''],                   // ایمیل/شماره/...
            provinceId: [0],
            cityId: [0],
            area: [''],
            postalCode: [null],
            telephoneId: [null],
            inhabitancyType: [1],
            startDate: [0],   // YYYYMMDD (جلالی)
            endDate: [0],     // YYYYMMDD (جلالی) یا 0/Null
            operationFlag: ['I'],
            postalCodeID: [null],
            telNumber: [''],  // برای سناریوهایی که telNumber جدا از contactValue می‌خوای
        });

        // ولیدیشن‌های شرطی
        if (contactType === 1 || contactType === 2 || contactType === 5) {
            // تلفن/موبایل/فکس -> فقط عدد 8 تا 15 رقم
            g.get('contactValue')?.setValidators([Validators.required, Validators.pattern(numericPattern)]);
            g.get('contactValue')?.updateValueAndValidity({ emitEvent: false });
        }

        if (contactType === 3) {
            // ایمیل
            g.get('contactValue')?.setValidators([Validators.required, Validators.email]);
            g.get('contactValue')?.updateValueAndValidity({ emitEvent: false });
        }

        if (contactType === 4) {
            // آدرس
            g.get('provinceId')?.setValidators([Validators.required]);
            g.get('cityId')?.setValidators([Validators.required]);
            g.get('area')?.setValidators([Validators.required, Validators.maxLength(255)]);
            g.get('postalCode')?.setValidators([Validators.required, Validators.pattern(postalPattern)]);
            g.get('inhabitancyType')?.setValidators([Validators.required]);
            g.get('provinceId')?.updateValueAndValidity({ emitEvent: false });
            g.get('cityId')?.updateValueAndValidity({ emitEvent: false });
            g.get('area')?.updateValueAndValidity({ emitEvent: false });
            g.get('postalCode')?.updateValueAndValidity({ emitEvent: false });
            g.get('inhabitancyType')?.updateValueAndValidity({ emitEvent: false });
        }

        return g;
    }
    onEdit(value:any){

    }
    onView(value:any){

    }
    constructor(
        private fb: FormBuilder,
        private neobankService: NeobankService,
    ) {}
    groups = [
        {label:'تلفن ثابت', value:'phone'},
        {label:'تلفن همراه', value:'social'},
        {label:'شبکه‌های اجتماعی', value:'social'}
    ];
    types  = [{label:'موبایل', value:'mobile'}, {label:'ایمیل', value:'email'}];

    form = this.fb.group({
        group: [null, Validators.required],
        type: [null, Validators.required],
        value: ['', Validators.required],
        isDefault: [false],
        startDate: [null],
        endDate: [null],
    });


}
type ContactType = 1 | 2 | 3 | 4 | 5; // 1=Phone, 2=Mobile, 3=Email, 4=Address, 5=Fax
type ContactGroupType = 1 | 2;        // 1=Personal, 2=Work
type InhabitancyType = 1 | 2;         // 1=Owner, 2=Rent
interface AddressForm {
    addressType: FormControl<AddressTypeCode | null>;
    provinceId:  FormControl<number | null>;
    cityId:      FormControl<number | null>;
    zone:        FormControl<string | null>;
    postalCode:  FormControl<string | null>;
    phoneNumber: FormControl<string | null>;
    startDate:   FormControl<any | null>;
    endDate:     FormControl<any | null>;
    addressText: FormControl<string | null>;

    // 👇 اضافه شود
    isDefault:   FormControl<boolean>;
}
type AddressTypeCode = 'home' | 'work' | 'billing' | 'shipping';
