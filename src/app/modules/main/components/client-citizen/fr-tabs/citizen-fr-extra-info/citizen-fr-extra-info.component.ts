import { Component, Input, OnInit, DestroyRef, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { TranslocoPipe } from '@ngneat/transloco';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { ButtonDirective } from 'primeng/button';
import { MatTooltip } from '@angular/material/tooltip';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import { Dialog } from 'primeng/dialog';


@Component({
    selector: 'app-citizen-fr-extra-info',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputText,
        DropdownModule,
        Checkbox,
        TranslocoPipe,
        PersianCalendarComponent,
        ButtonDirective,
        MatTooltip,
        TableModule,
        Tooltip,
        Dialog,
    ],
    templateUrl: './citizen-fr-extra-info.component.html',
    styleUrls: ['./citizen-fr-extra-info.component.scss'],
})
export class CitizenFrExtraInfoComponent implements OnInit {
    // ورودی‌های هماهنگ با سیستم تب داینامیک شما
    @Input() disabled = false;
    @Input() onValueChange: (val: ExtraInfo) => void = () => {};
    @Input() onValidityChange: (valid: boolean) => void = () => {};

    private destroyRef = inject(DestroyRef);
    visibleContact = false;

    extraFg = this.fb.group({
        religionId: [null as number | null, []],
        religionDetailId: [null as number | null, []],
        maritalStatus: [null as number | null, []],
        isInquiryApproved: [false, []],
        enFirstName: ['', [Validators.maxLength(100)]],
        enLastName: ['', [Validators.maxLength(100)]],
        enFatherName: ['', [Validators.maxLength(100)]],
        enbirthDate: [null as number | null, []],
    });
    extraDialogForm = this.fb.group({
        initiativeType: [null, Validators.required],
        endDate: [null, Validators.required],
        percent: [null, Validators.required],

    });

    // آپشن‌ها
    religionOptions = [
        { label: 'اسلام', value: 1 },
        { label: 'مسیحیت', value: 2 },
        { label: 'یهودیت', value: 3 },
        { label: 'سایر', value: 99 },
    ];

    denominationOptions = [
        // اسلام
        { label: 'شیعه', value: 11, parent: 1 },
        { label: 'سنی', value: 12, parent: 1 },
        // مسیحیت
        { label: 'کاتولیک', value: 21, parent: 2 },
        { label: 'ارتدوکس', value: 22, parent: 2 },
        // یهودیت
        { label: 'ارتدوکس', value: 31, parent: 3 },
        // سایر
        { label: 'سایر', value: 990, parent: 99 },
    ];
    initiativeTypes = [
        { label: 'فردی', value: 'individual' },
        { label: 'گروهی', value: 'group' },
        { label: 'بخش/واحد', value: 'department' },
        { label: 'سازمانی', value: 'organizational' },
        { label: 'ملی', value: 'national' }
    ];

    denominationFiltered = this.denominationOptions;

    maritalOptions = [
        { label: 'مجرد', value: 1 },
        { label: 'متاهل', value: 2 },
        { label: 'سایر', value: 9 },
    ];
    selflessTable: any[] = [];
    constructor(private fb: FormBuilder) {}
    addSelfless() {
        this.visibleContact = true;
    }
    closeContact() { this.visibleContact = false; }

    submitContact() {
        // TODO: ارسال فرم
        this.closeContact();
    }

    ngOnInit(): void {
        if (this.disabled) {
            this.extraFg.disable({ emitEvent: false });
        }

        // اگر فرم از قبل مقدار داشت (edit mode)، فیلتر اولیه مذهب را ست کن
        this.onReligionChange(this.extraFg.get('religionId')?.value ?? null);

        // انتشار تغییرات مقدار/اعتبار
        this.extraFg.valueChanges
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
                this.onValueChange(this.getValue());
                this.onValidityChange(this.extraFg.valid);
            });
    }

    onReligionChange(religionId: number | null) {
        this.denominationFiltered = religionId
            ? this.denominationOptions.filter((d) => d.parent === religionId)
            : [];

        // اگر گزینه‌ی فعلی مذهب با دین انتخابی هم‌خوانی نداشت، خالی‌اش کن
        const current = this.extraFg.get('religionDetailId')?.value;
        if (
            current &&
            !this.denominationFiltered.some((d) => d.value === current)
        ) {
            this.extraFg.patchValue(
                { religionDetailId: null },
                { emitEvent: false }
            );
        }
    }

    /** مقدار خروجی با شکل یکنواخت */
    private getValue(): ExtraInfo {
        const raw = this.extraFg.getRawValue();
        return {
            religionId: raw.religionId,
            religionDetailId: raw.religionDetailId,
            maritalStatus: raw.maritalStatus,
            isInquiryApproved: !!raw.isInquiryApproved,
            enFirstName: raw.enFirstName?.trim() ?? '',
            enLastName: raw.enLastName?.trim() ?? '',
            enFatherName: raw.enFatherName?.trim() ?? '',
            enbirthDate: raw.enbirthDate ?? null,
        };
    }
}

type ExtraInfo = {
    religionId: number | null;
    religionDetailId: number | null;
    maritalStatus: number | null;
    isInquiryApproved: boolean;    // در API عدد می‌فرستیم (0/1)، در UI بولین نگه می‌داریم
    enFirstName: string;
    enLastName: string;
    enFatherName: string;
    enbirthDate: number | null;    // YYYYMMDD (jalali int)
};
