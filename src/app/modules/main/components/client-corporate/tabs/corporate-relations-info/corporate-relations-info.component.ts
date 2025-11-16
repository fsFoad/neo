import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup, ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TranslocoPipe } from '@ngneat/transloco';
import { Dialog } from 'primeng/dialog';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MatTooltip } from '@angular/material/tooltip';
import { InputText } from 'primeng/inputtext';

@Component({
    selector: 'app-corporate-relations-info',
    imports: [
        PersianCalendarComponent,
        ButtonDirective,
        DropdownModule,
        ReactiveFormsModule,
        TranslocoPipe,
        Dialog,
        DatePipe,
        TableModule,
        MatTooltip,
        InputText,
    ],
    templateUrl: './corporate-relations-info.component.html',
    styleUrl: './corporate-relations-info.component.scss',
})
export class CorporateRelationsInfoComponent implements OnInit {
    @Input() disabled = false;

    // برای تب‌های داینامیک (اختیاری)
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
        count: this.fb.control<any | null>(null),

    });
    relationForm!: FormGroup;
    visibleContact = false;
    visibleRelation = false;
    relationsTable = [];
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

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();
        if (this.disabled) {
            this.relationForm.disable({ emitEvent: false });
        }

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
    linkTypeId: number;           // نوع رابطه (همسر/پدر/.../شریک)
    relatedNationalId: string;    // کدملی طرف مقابل (اختیاری، اگر clientId داری)
    relatedFirstName: string;
    relatedLastName: string;
    relatedClientId: number | null; // اگر طرف مقابل در سیستم‌ ثبت شده
    sharePercent: number | null;    // برای روابط تجاری
    startDate: number | null;       // YYYYMMDD (جلالی)
    endDate: number | null;         // YYYYMMDD (جلالی)
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
    count: FormControl<string | null>;
}
