import { ChangeDetectorRef, Component, Input, signal, TemplateRef, Type, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TabPanel, TabView } from 'primeng/tabview';
import { Calendar } from 'primeng/calendar';
import { Button, ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { NgClass, NgComponentOutlet, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { AliveTypePipe } from '../../../../shared/pipes/alive-type.pipe';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ShenasnamehInputComponent } from '../../../../shared/components/shenasnameh-input/shenasnameh-input.component';
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatIcon } from '@angular/material/icon';
import { MatChip } from '@angular/material/chips';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { CitizenIdentityInfoComponent } from '../tabs/citizen-identity-info/citizen-identity-info.component';
import { CitizenContactInfoComponent } from '../tabs/citizen-contact-info/citizen-contact-info.component';
import { CitizenSignatureInfoComponent } from '../tabs/citizen-signature-info/citizen-signature-info.component';
import { CitizenRelationsInfoComponent } from '../tabs/citizen-relations-info/citizen-relations-info.component';
import { CitizenActivityInfoComponent } from '../tabs/citizen-activity-info/citizen-activity-info.component';
import { CitizenEducationInfoComponent } from '../tabs/citizen-education-info/citizen-education-info.component';
import { CitizenDocumentsInfoComponent } from '../tabs/citizen-documents-info/citizen-documents-info.component';
import { CitizenExtraInfoComponent } from '../tabs/citizen-extra-info/citizen-extra-info.component';
import { CitizenCommercialInfoComponent } from '../tabs/citizen-commercial-info/citizen-commercial-info.component';
import { CitizenPassportInfoComponent } from '../tabs/citizen-passport-info/citizen-passport-info.component';
import { CitizenLicenseInfoComponent } from '../tabs/citizen-license-info/citizen-license-info.component';
import { CitizenReviewService } from '../../../services/citizen-review.service';
import {
    CitizenConfirmationInfoComponent
} from '../tabs/citizen-confirmation-info/citizen-confirmation-info.component';


@Component({
    selector: 'app-register-client-citizen',
    imports: [
        ReactiveFormsModule,
        NgIf,
        DropdownModule,
        Checkbox,
        Button,
        AliveTypePipe,
        NgClass,
        ShenasnamehInputComponent,
        MatTabGroup,
        MatTab,
        NgForOf,
        MatIcon,
        MatChip,
        NgTemplateOutlet,
        MatTooltip,
        MatIconButton,
        MatTabLabel,
        NgComponentOutlet,
        MatTabContent,
        ButtonDirective,
    ],
    standalone: true,
    templateUrl: './register-client-citizen.component.html',
    styleUrl: './register-client-citizen.component.scss',
    animations: [
        trigger('tabContent', [
            // ورود: کم‌کم ظاهر + اسلاید خیلی ظریف
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(8px)' }),
                animate(
                    '220ms cubic-bezier(.2,.8,.2,1)',
                    style({ opacity: 1, transform: 'translateY(0)' })
                ),
            ]),
            // خروج: محو سریع
            transition(':leave', [
                animate(
                    '140ms ease-in',
                    style({ opacity: 0, transform: 'translateY(6px)' })
                ),
            ]),
        ]),
    ],
    /*animations: [
        trigger('dropDown', [
            state(
                'normal',
                style({
                    transform: 'translateY(0)',
                    opacity: 1,
                })
            ),
            state(
                'stretched',
                style({
                    letterSpacing: '10px',
                    lineHeight: '2.5',
                })
            ),
            transition('normal => stretched', [animate('1s ease-in-out')]),
        ]),
    ],*/
})
export class RegisterClientCitizenComponent {
    @Input() InputCitizen;
    currentClientId = 1001;
    selectedIndex = 0; // مقدار اولیه
    nationalCode:any
    customerNo:any
    fullName:any
    trackById = (_: number, t: any) => t.id ?? _;
    tabs = [
        {
            id: 'identity',
            label: 'اطلاعات هویتی',
            icon: 'badge',
            cmp: CitizenIdentityInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('identity', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('identity', valid),
            },
        },
        {
            id: 'contact',
            label: 'اطلاعات تماس',
            icon: 'contacts',
            cmp: CitizenContactInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('contact', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('contact', valid),
            },
        },
        {
            id: 'signature',
            label: 'امضاء',
            icon: 'draw',
            cmp: CitizenSignatureInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('signature', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('signature', valid),
            },
        },
        {
            id: 'relations',
            label: 'روابط',
            icon: 'group',
            cmp: CitizenRelationsInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('relations', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('relations', valid),
            },
        },
        {
            id: 'industry',
            label: 'زمینه فعالیت',
            icon: 'category',
            cmp: CitizenActivityInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('activity', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('activity', valid),
            },
        },
        {
            id: 'edu',
            label: 'اطلاعات تحصیلی',
            icon: 'school',
            cmp: CitizenEducationInfoComponent,
            inputs: {
                disabled: false,
                outputs: {
                    valueChange: (e: any) => this.collect('education', e),
                    validityChange: (v: boolean) =>
                        this.setTabValidity('education', v),
                },
            },
        },
        {
            id: 'docs',
            label: 'مستندات',
            icon: 'folder_open',
            cmp: CitizenDocumentsInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('documents', payload),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('documents', valid),
            },
        },
        {
            id: 'extra',
            label: 'اطلاعات تکمیلی',
            icon: 'info',
            cmp: CitizenExtraInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('extra', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('extra', valid),
            },
        },
        {
            id: 'business',
            label: 'اطلاعات تجاری',
            icon: 'storefront',
            cmp: CitizenCommercialInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('business', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('business', valid),
            },
        },
        {
            id: 'passport',
            label: 'اطلاعات گذرنامه - تابعیت',
            icon: 'public',
            cmp: CitizenPassportInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('passport', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('passport', valid),
            },
        },
        {
            id: 'license',
            label: 'اطلاعات مجوز',
            icon: 'verified',
            cmp: CitizenLicenseInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('license', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('license', valid),
            },
        },
        {
            id: 'final',
            label: 'تأیید نهایی',
            icon: 'fact_check',
            cmp: CitizenConfirmationInfoComponent,
            inputs: {
                disabled: false,
                // لودر از سرویس
                loader: () =>
                    this.reviewSvc.getChangeFlags(this.currentClientId),
                // کال‌بک ثبت
                submitClick: () => this.onFinalSubmit(),
            },
        },
    ];

    // ← امضای درست بدون تداخل نام
    collect(kind: string, payload: any) {
        // مثال:
        // this.aggregate = { ...this.aggregate, ...payload };
    }

    setTabValidity(kind: string, valid: boolean) {
        // مثال:
        // this.tabsValidity = { ...this.tabsValidity, [kind]: valid };
    }
    onFinalSubmit() {
        // TODO: aggregate payload from tabs (state/facade) و سرویس ثبت نهایی
        console.log('Submitting final aggregate payload...');
        // this.neobankService.saveAll(this.aggregate).subscribe(...)
    }
    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private msg: MessageService,
        private reviewSvc: CitizenReviewService
    ) {}
}
type TabDef = {
    id: string;
    label: string;
    icon: string;
    disabled?: boolean;
    cmp: Type<any> | null;
    inputs?: Record<string, any>;
};
