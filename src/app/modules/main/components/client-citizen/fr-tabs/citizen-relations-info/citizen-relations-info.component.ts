import { DatePipe, NgForOf, NgIf } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Subscription } from 'rxjs';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { NeobankService } from '../../../../services/neobank.service';

@Component({
    selector: 'app-corporate-relations-info',
    imports: [
        TranslocoPipe,
        Checkbox,
        PersianCalendarComponent,
        DropdownModule,
        ReactiveFormsModule,
        ButtonDirective,
        InputText,
        NgForOf,
        DatePipe,
        Dialog,
        MatTooltip,
        NgIf,
        TableModule,
        Tooltip,
        InputGroup,
        InputGroupAddon,
    ],
    templateUrl: './citizen-relations-info.component.html',
    styleUrl: './citizen-relations-info.component.scss',
})
export class CitizenRelationsInfoComponent implements OnInit, OnDestroy {
    @Input() disabled = false;

    searchInputLabel = 'شماره مشتری';
    @Input() onValueChange?: (val: any) => void;
    @Input() onValidityChange?: (valid: boolean) => void;

    @Output() valueChange = new EventEmitter<any>();
    @Output() validityChange = new EventEmitter<boolean>();

    relationFormDialog: FormGroup<RelationForm> = this.fb.group<RelationForm>({
        searchType: this.fb.control<any | null>(null, {
            validators: Validators.required,
        }),
        searchValue: this.fb.control<string | null>(null, {
            validators: Validators.required,
        }),

        nationalCode: this.fb.control<string | null>(null),
        relatedCustomerNumber: this.fb.control<string | null>(null),
        relatedCustomerTitle: this.fb.control<string | null>(null),

        relationType: this.fb.control<any | null>(null),
        relationDegree: this.fb.control<any | null>(null),
        startDate: this.fb.control<string | null>(null),

        endDate: this.fb.control<string | null>(null),
        letterNumber: this.fb.control<string | null>(null),
        letterIssueDate: this.fb.control<string | null>(null),
        letterIssuePlace: this.fb.control<any | null>(null),

        authoritiesLimit: this.fb.control<string | null>(null),
        shareValue: this.fb.control<string | null>(null),
        sharePercent: this.fb.control<string | null>(null),
        lastSharePurchaseDate: this.fb.control<string | null>(null),
    });
    relationForm!: FormGroup;
    visibleContact = false;
    visibleRelation = false;
    relationsTable = [];
    searchInputPlaceholder = '';
    private sub = new Subscription();

    searchList = [
        { label: 'شماره ملی', value: 1 },
        { label: 'کد اتباع', value: 2 },
        { label: 'شناسه ملی', value: 3 },
        { label: 'شماره مشتری', value: 4 },
        { label: 'شناسه ملی مشتری خارجی', value: 5 },
    ];

    relationDegreeOptions = [
        { label: 'پدر', value: 'FATHER' },
        { label: 'مادر', value: 'MOTHER' },
        { label: 'همسر', value: 'SPOUSE' },
        { label: 'فرزند', value: 'CHILD' },
        { label: 'برادر', value: 'BROTHER' },
        { label: 'خواهر', value: 'SISTER' },
        { label: 'ولی/قیم', value: 'GUARDIAN' },
        { label: 'وکیل/نماینده', value: 'REPRESENTATIVE' },
        { label: 'شریک', value: 'PARTNER' },
        { label: 'سایر', value: 'OTHER' },
    ];

    // محل صدور نامه
    letterPlaceOptions = [
        { label: 'دفتر مرکزی', value: 'HQ' },
        { label: 'شعبه تهران', value: 'TEH' },
        { label: 'شعبه مشهد', value: 'MSH' },
        { label: 'شعبه اصفهان', value: 'ISF' },
        { label: 'شعبه شیراز', value: 'SHZ' },
        { label: 'شعبه تبریز', value: 'TBZ' },
        { label: 'سایر', value: 'OTHER' },
    ];
    relationTypeOptions = [
        { label: 'سهامدار', value: 'SHAREHOLDER' },
        { label: 'عضو هیئت‌مدیره', value: 'BOARD_MEMBER' },
        { label: 'بازرس', value: 'AUDITOR' },
        { label: 'مدیرعامل', value: 'CEO' },
        { label: 'وکیل / نماینده قانونی', value: 'ATTORNEY' },
        { label: 'ولی / قیم', value: 'GUARDIAN' },
        { label: 'شریک', value: 'PARTNER' },
        { label: 'ذینفع', value: 'BENEFICIARY' },
        { label: 'سایر', value: 'OTHER' },
    ];
    searchTypes = [
        { label: 'شماره مشتری', value: '1' },
        { label: 'کد ملی', value: '2' },
        { label: 'کد اتباع', value: '3' },
    ];
    searchTypesRelatation = [
        { label: 'شماره ملی', value: '1' },
        { label: 'کد اتباع', value: '2' },
        { label: 'شناسه ملی', value: '3' },
        { label: 'شماره مشتری', value: '4' },
        { label: 'شناسه ملی مشتری خارجی', value: '5' },
    ];
    selectedSearchType = '1';
    searchPerformed: boolean = false;
    searchValue = '';
    customers=[]
    constructor(
        private fb: FormBuilder,
        private neobankService: NeobankService
    ) {}

    setSearchInputMetadata(type: string): void {
        const typeMeta = this.searchTypes.find((t) => t.value === type);
        this.searchInputPlaceholder =
            type === 'customerId'
                ? 'CUST001'
                : type === 'nationalcode'
                  ? '0050650487'
                  : type === 'atba'
                    ? '8912345678901'
                    : 'اطلاعات را وارد کنید';
    }
    onSearchTypeChange(event: any): void {
        this.selectedSearchType = event.value;
        this.setSearchInputMetadata(this.selectedSearchType);
    }
    searchCustomer(): void {
        debugger;
        this.searchPerformed = true;
        this.onSimpleSearch();
    }

    onSimpleSearch(): void {
        /*  const simpleGroup = this.searchForm.get('simple');*/
        debugger;
        let searchTypes = Number(this.selectedSearchType);
        let searchValue = Number(this.searchValue);
        this.neobankService
            .easyretrieveclientcitizen(searchTypes, searchValue)
            .subscribe((res) => {
                debugger;
                console.log('x', res);
                this.customers = [];
                Array.isArray(res.result)
                    ? (this.customers = res.result)
                    : this.customers.push(res.result);
                console.log('this.customers', this.customers);
            });
        /*  if (simpleGroup?.valid) {
            const { type, value } = simpleGroup.value;
            console.log('جستجوی ساده با', { type, value });
            // TODO: فراخوانی سرویس یا فیلتر داده‌ها
        }*/
    }

    ngOnInit(): void {
        this.buildForm();
        this.relationFormDialog.controls['nationalCode'].disable()
        this.relationFormDialog.controls['relatedCustomerNumber'].disable()
        this.relationFormDialog.controls['relatedCustomerTitle'].disable()

        if (this.disabled) {
            this.relationForm.disable({ emitEvent: false });
        }
        const selected = this.searchTypesRelatation[0];
        this.searchInputLabel = selected ? selected.label : 'مقدار جستجو';
        this.sub.add(
            this.relationForm.valueChanges.subscribe(() => {
                const val = this.getValue(); // خروجی به فرمت clientLinkLists
                const valid = this.relationForm.valid;
                this.valueChange.emit(val);
                this.validityChange.emit(valid);
                if (this.onValueChange) {
                    this.onValueChange(val);
                }
                if (this.onValidityChange) {
                    this.onValidityChange(valid);
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private buildForm(): void {
        this.relationForm = this.fb.group({
            searchType: [{ value: '', disabled: false }],
            count: [{ value: '', disabled: false }],
        });
    }

    onSearch() {}

    get relationsFa(): FormArray {
        return this.relationForm.get('relations') as FormArray;
    }

    private createRow(): FormGroup {
        return this.fb.group({
            linkTypeId: new FormControl<number>(1, {
                nonNullable: true,
                validators: [Validators.required],
            }),
            relatedNationalId: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.pattern(/^\d{10}$/)],
            }),
            relatedFirstName: new FormControl<string>('', {
                nonNullable: true,
            }),
            relatedLastName: new FormControl<string>('', { nonNullable: true }),
            relatedClientId: new FormControl<number | null>(null),
            sharePercent: new FormControl<number | null>(null, {
                validators: [],
            }),
            startDate: new FormControl<number | null>(null),
            endDate: new FormControl<number | null>(null),
            description: new FormControl<string>('', { nonNullable: true }),
            isDefault: new FormControl<boolean>(false, { nonNullable: true }),
        });
    }

    openContact() {
        this.visibleRelation = true;
    }

    closeContact() {
        this.visibleRelation = false;
    }

    submitContact() {
        // TODO: ارسال فرم
        this.closeContact();
    }

    get contacts(): FormArray {
        return this.relationForm.get('contacts') as FormArray;
    }

    getValue(): { clientLinkLists: any[] } {
        const rows: RelationRow[] = (this.relationsFa.getRawValue() ||
            []) as RelationRow[];
        const clientLinkLists = rows.map((r) => ({
            linkTypeId: r.linkTypeId,
            relatedClientId: r.relatedClientId,
            nationalId: r.relatedNationalId || null,
            firstName: r.relatedFirstName || '',
            lastName: r.relatedLastName || '',
            sharePercent: r.sharePercent ?? null,
            startDate: r.startDate ?? null,
            endDate: r.endDate ?? null,
            description: r.description || '',
            isDefault: r.isDefault ? 1 : 0,
            operationFlag: 'I',
        }));
        return { clientLinkLists };
    }
}

type RelationRow = {
    linkTypeId: number; // نوع رابطه (همسر/پدر/.../شریک)
    relatedNationalId: string; // کدملی طرف مقابل (اختیاری، اگر clientId داری)
    relatedFirstName: string;
    relatedLastName: string;
    relatedClientId: number | null; // اگر طرف مقابل در سیستم‌ ثبت شده
    sharePercent: number | null; // برای روابط تجاری
    startDate: number | null; // YYYYMMDD (جلالی)
    endDate: number | null; // YYYYMMDD (جلالی)
    description: string;
    isDefault: boolean;
};

interface RelationForm {
    searchType: FormControl<any | null>;
    searchValue: FormControl<string | null>;

    nationalCode: FormControl<string | null>;
    relatedCustomerNumber: FormControl<string | null>;
    relatedCustomerTitle: FormControl<string | null>;

    relationType: FormControl<any | null>;
    relationDegree: FormControl<any | null>;
    startDate: FormControl<string | null>;

    endDate: FormControl<string | null>;
    letterNumber: FormControl<string | null>;
    letterIssueDate: FormControl<string | null>;
    letterIssuePlace: FormControl<any | null>;

    authoritiesLimit: FormControl<string | null>;
    shareValue: FormControl<string | null>;
    sharePercent: FormControl<string | null>;
    lastSharePurchaseDate: FormControl<string | null>;
}
