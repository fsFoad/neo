import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { Button } from 'primeng/button';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { PersianCalendarComponent } from '../../../../../shared/components/persian-calendar/persian-calendar.module';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
    selector: 'app-citizen-fr-confirmation-info',
    standalone: true,
    imports: [
        NgIf,
        NgFor,
        Button,
        MatIcon,
        FormsModule,
        InputText,
        PersianCalendarComponent,
        TranslocoPipe,
        NgClass,
    ],
    templateUrl: './citizen-fr-confirmation-info.component.html',
    styleUrl: './citizen-fr-confirmation-info.component.scss',
})
export class CitizenFrConfirmationInfoComponent implements OnInit {
    /** اگر دادهٔ خام داری مستقیم بده */
    @Input() flags: ChangeFlagsDto | null = null;
    @Input() disabled = false;
    @Input() onValueChange: (v: any) => void;
    @Input() onValidityChange: (v: boolean) => void;
    /** اگر بخوای از والد لودری بدی که خودش از سرویس می‌خونه */
    @Input() loader?: () => import('rxjs').Observable<ChangeFlagsDto>;

    /** دکمه ثبت نهایی رو وقتی زد، این ایونت می‌ره به والد */
    @Output() submitClick = new EventEmitter<void>();

    loading = false;
    error: string | null = null;
    rows: Row[] = [];

    ngOnInit(): void {
        if (this.loader) {
            this.loading = true;
            this.loader().subscribe({
                next: (f) => {
                    this.flags = f;
                    this.buildRows();
                    this.loading = false;
                },
                error: () => {
                    this.error = 'خطا در دریافت وضعیت تب‌ها';
                    this.loading = false;
                },
            });
        } else {
            this.buildRows();
        }
    }

    private buildRows(): void {
        if (!this.flags) {
            this.rows = [];
            return;
        }

        const f = this.flags;
        this.rows = [
            {
                key: 'identityChangeFlag',
                label: 'اطلاعات هویتی',
                ok: !!f.identityChangeFlag,
            },
            {
                key: 'contactChangeFlag',
                label: 'اطلاعات تماس',
                ok: !!f.contactChangeFlag,
            },
            { key: 'signChangeFlag', label: 'امضاء', ok: !!f.signChangeFlag },
            {
                key: 'clientLinkChangeFlag',
                label: 'روابط',
                ok: !!f.clientLinkChangeFlag,
            },
            {
                key: 'scopWorkChangeFlag',
                label: 'زمینه فعالیت',
                ok: !!f.scopWorkChangeFlag,
            },
            {
                key: 'clientEeducationInfoChangFlag',
                label: 'اطلاعات تحصیلی',
                ok: !!f.clientEeducationInfoChangFlag,
            },
            {
                key: 'documentChangFlag',
                label: 'مستندات',
                ok: !!f.documentChangFlag,
            },
            {
                key: 'extendchangeFlag',
                label: 'اطلاعات تکمیلی',
                ok: !!f.extendchangeFlag,
            },
            {
                key: 'commercialInfoChangeFlag',
                label: 'اطلاعات تجاری',
                ok: !!f.commercialInfoChangeFlag,
            },
            {
                key: 'passportInfoChangFlag',
                label: 'اطلاعات گذرنامه - تابعیت',
                ok: !!f.passportInfoChangFlag,
            },
            {
                key: 'workPlaceChangeFlag',
                label: 'محل کار (درصورت وجود)',
                ok: !!f.workPlaceChangeFlag,
            },
        ];
    }

    onSubmit(): void {
        this.submitClick.emit();
    }
}
export interface ChangeFlagsDto {
    scopWorkChangeFlag: 0|1;
    workPlaceChangeFlag: 0|1;
    clientEeducationInfoChangFlag: 0|1;
    documentChangFlag: 0|1;
    clientLinkChangeFlag: 0|1;
    extendchangeFlag: 0|1;
    passportInfoChangFlag: 0|1;
    contactChangeFlag: 0|1;
    signChangeFlag: 0|1;
    commercialInfoChangeFlag: 0|1;
    identityChangeFlag: 0|1;
}
type Row = { key: keyof ChangeFlagsDto; label: string; ok: boolean };
