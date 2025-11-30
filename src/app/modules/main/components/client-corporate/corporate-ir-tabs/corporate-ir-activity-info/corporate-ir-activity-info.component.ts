import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TranslocoPipe } from '@ngneat/transloco';
import { TableModule } from 'primeng/table';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
    selector: 'app-corporate-ir-activity-info',
    imports: [
        ReactiveFormsModule,
        TranslocoPipe,
        TableModule,
        DatePipe,
        DecimalPipe,
        Dialog,
        DropdownModule,
        PersianCalendarComponent,
        ButtonDirective,
        Tooltip,
    ],
    templateUrl: './corporate-ir-activity-info.component.html',
    styleUrl: './corporate-ir-activity-info.scss',
})
export class CorporateIrActivityInfoComponent implements OnInit {
    @Input() disabled = false;
    @Input() onValueChange?: (val: any) => void;
    @Input() onValidityChange?: (valid: boolean) => void;
    @Output() valueChange = new EventEmitter<any>();
    @Output() validityChange = new EventEmitter<boolean>();
    actinityInformationDialog = this.fb.group<ActivityInfoForm>({
        economicSectorType: this.fb.control<any | null>(null, {
            validators: Validators.required,
        }),
        activityField: this.fb.control<any | null>(null),
        activitySubField: this.fb.control<any | null>(null),
        activityDescription: this.fb.control<any | null>(null),
        startDate: this.fb.control<any | null>(null, {
            validators: Validators.required,
        }),
        endDate: this.fb.control<any | null>(null),
    });
    placeForm = this.fb.group({
        placeType: this.fb.control<string | null>(null, {
            validators: Validators.required,
        }),
        tenureType: this.fb.control<string | null>(null),
        area: this.fb.control<string | null>(null), // اگر عدد: Validators.pattern(/^\d+$/)
        hasKeyMoney: this.fb.control<boolean | null>(null, {
            validators: Validators.required,
        }),
    });

    placeTypeOptions = [
        { label: 'اداری', value: 'OFFICE' },
        { label: 'کارگاهی', value: 'WORKSHOP' },
        { label: 'تجاری', value: 'RETAIL' },
        { label: 'انبار', value: 'WAREHOUSE' },
        { label: 'سایر', value: 'OTHER' },
    ];

    tenureTypeOptions = [
        { label: 'استیجاری', value: 'RENTED' },
        { label: 'ملکی', value: 'OWNED' },
        { label: 'رایگان/در اختیار', value: 'FREE' },
        { label: 'واگذاری', value: 'ASSIGNED' },
    ];

    keyMoneyOptions = [
        { label: 'دارد', value: true },
        { label: 'ندارد', value: false },
    ];

    // گزینه‌های نمونه (با بک‌اند خودت سینک کن)
    economicSectorOptions = [
        { label: 'کشاورزی', value: 'AGRI' },
        { label: 'صنعت', value: 'IND' },
        { label: 'خدمات', value: 'SERV' },
        { label: 'ساخت‌وساز', value: 'CONST' },
        { label: 'سایر', value: 'OTHER' },
    ];

    activityFieldOptions = [
        { label: 'تولید', value: 'PROD' },
        { label: 'فروش/خرده‌فروشی', value: 'RETAIL' },
        { label: 'حمل‌ونقل', value: 'LOGI' },
        { label: 'فناوری اطلاعات', value: 'IT' },
        { label: 'آموزش', value: 'EDU' },
    ];

    activitySubFieldOptions = [
        { label: 'قطعه‌سازی', value: 'PARTS' },
        { label: 'مواد غذایی', value: 'FOOD' },
        { label: 'پوشاک', value: 'APPAREL' },
        { label: 'نرم‌افزار', value: 'SOFT' },
        { label: 'سایر', value: 'OTHER' },
    ];
    placeContacts = [
        {
            id: 1,
            contactType: 'تلفن ثابت',
            contactDetail: 'داخلی 203 - واحد فروش',
            description: 'دفتر مرکزی',
            postalCode: '1234567890',
            phone: '021-12345678',
            startDate: '2024-01-10',
            endDate: null,
        },
        {
            id: 2,
            contactType: 'موبایل',
            contactDetail: 'مسئول هماهنگی',
            description: 'شیفت عصر',
            postalCode: '1135647890',
            phone: '09121234567',
            startDate: '2024-02-01',
            endDate: null,
        },
    ];

    // انتخاب‌ها
    selectedContacts: any[] = [];

    /*   actinityInformationDialog: FormGroup<RelationForm> = this.fb.group<RelationForm>({
           searchType: this.fb.control<any | null>(null, { validators: Validators.required }),
           searchValue: this.fb.control<string | null>(null, { validators: Validators.required }),
           count: this.fb.control<any | null>(null, { validators: Validators.required }),
       });*/
    activityInformationForm!: FormGroup;
    visibleActivityInformation = false;
    visiblePlaceDialog = false;
    visibleRelation = false;
    visibleDefinePlaceDialog = false;
    visiblePlaceOptionDialog = false;

    selectedRow: any;
    activityTable: Array<{
        economicSectorType: string;
        activityField: string;
        activityDetail: string;
        startDate: string | Date | null;
        endDate: string | Date | null;
    }> = [
        {
            economicSectorType: 'خدمات',
            activityField: 'فناوری اطلاعات',
            activityDetail: 'توسعه نرم‌افزار سازمانی',
            startDate: '2023-04-01',
            endDate: null, // هنوز فعال
        },
    ];

    // جدول جزئیات محل فعالیت: حداکثر یک ردیف نمونه
    placeDetailsTable: Array<{
        placeType: string;
        tenureType: string;
        keyMoney: number | null;
        area: number | null;
    }> = [
        {
            placeType: 'اداری',
            tenureType: 'استیجاری',
            keyMoney: 0,
            area: 120,
        },
    ];
    private sub = new Subscription();

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
        if (this.disabled) {
            this.activityInformationForm.disable({ emitEvent: false });
        }

        this.sub.add(
            this.activityInformationForm.valueChanges.subscribe(() => {
                // const val = this.getValue(); // خروجی به فرمت clientLinkLists
                // const valid = this.relationForm.valid;
                // this.valueChange.emit(val);
                // this.validityChange.emit(valid);
                // if (this.onValueChange) {
                //     this.onValueChange(val);
                // }
                // if (this.onValidityChange) {
                //     this.onValidityChange(valid);
                // }
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private buildForm(): void {
        this.activityInformationForm = this.fb.group({
            searchType: [{ value: '', disabled: false }],
            count: [{ value: '', disabled: false }],
        });
    }

    openContact() {
        this.visibleActivityInformation = true;
    }
    closeContact() {
        this.visibleRelation = false;
    }
    submitActivityInfo() {
        // TODO: ارسال فرم
        this.closeContact();
    }

    openDefinePlaceDialog(row: any) {
        this.selectedRow = row;
        this.visiblePlaceOptionDialog = true; // دیالوگ تعریف باز شود
    }

    // ویرایش محل فعالیت
    openEditPlaceDialog(row: any) {
        this.selectedRow = row;
        this.visiblePlaceOptionDialog = true; // دیالوگ ویرایش باز شود
    }

    // جزئیات محل فعالیت
    openPlaceDetailsDialog(row: any) {
        this.selectedRow = row;
        this.visiblePlaceOptionDialog = true; // دیالوگ جزئیات باز شود
    }
    openSetContactInfoDialog(row: any) {
        this.selectedRow = row;
        this.visibleDefinePlaceDialog = true;
    }

    /** ویرایش اطلاعات تماس */
    openEditContactInfoDialog(row: any) {
        this.selectedRow = row;
        this.visibleDefinePlaceDialog = true;
    }

    /** نمایش اطلاعات تماس */
    openShowContactInfoDialog(row: any) {
        this.selectedRow = row;
        this.visibleDefinePlaceDialog = true;
    }
    onEditActivity(value: any) {
        this.visiblePlaceDialog = true;
    }
    onEditActivityPlaceContact(value: any) {
        this.visiblePlaceDialog = false;
    }
    onEditActivityPlacesubmitActivityInfo(value: any) {
        // TODO: ارسال فرم
        this.closeContact();
    }

    onViewActivityPlace(value: any) {
        this.visiblePlaceDialog = true;
    }
    eonViewActivityPlaceContact(value: any) {
        this.visiblePlaceDialog = false;
    }
    onViewActivityPlaceInfo(value: any) {
        // TODO: ارسال فرم
        this.closeContact();
    }

    onSetContactInfo(value: any) {
        this.visibleActivityInformation = true;
    }
    onSetContactInfoContact(value: any) {
        this.visibleRelation = false;
    }
    onSetContactInfoActivityInfo(value: any) {
        // TODO: ارسال فرم
        this.closeContact();
    }
    onEditPlace(value: any) {
        this.visibleActivityInformation = true;
    }
    onEditPlaceContact(value: any) {
        this.visibleRelation = false;
    }
    onEditPlacesubmitActivityInfo(value: any) {
        // TODO: ارسال فرم
        this.closeContact();
    }

    onShowContactInfo(value: any) {
        this.visibleActivityInformation = true;
    }
    onShowContactInfoContact(value: any) {
        this.visibleRelation = false;
    }
    onShowContactInfoInfo(value: any) {
        // TODO: ارسال فرم
        this.closeContact();
    }

    get contacts(): FormArray {
        return this.activityInformationForm.get('contacts') as FormArray;
    }

    submitPlace() {
        if (this.placeForm.invalid) return;
        const payload = this.placeForm.getRawValue();
        // TODO: ارسال به سرور
    }

    // بستن دیالوگ
    closePlaceDialog() {
        this.visiblePlaceDialog = false;
        this.placeForm.reset();
    }
    confirmSelectedContacts() {
        // TODO: هر کاری لازم داری با selection انجام بده
        // console.log(this.selectedContacts);
        this.closePlaceDialog();
    }

    // بستن دیالوگ
    closePlaceCancelDialog() {
        this.visibleDefinePlaceDialog = false;
        this.selectedContacts = [];
    }
}

type OperationFlag = 'I' | 'U' | 'D';

interface ActivityInfoForm {
    economicSectorType: any | null;
    activityField: any | null;
    activitySubField: any | null;
    activityDescription: any | null;
    startDate: any | null;
    endDate: any | null;
}

