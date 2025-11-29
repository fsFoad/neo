import { Component, Input } from '@angular/core';
import {
    OnInit,
    Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { NgComponentOutlet, NgFor, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { FrRegisterFacade } from '../application-NgRx/fr-register/fr-register.facade';
import { FrRegisterTabId } from '../application-NgRx/fr-register/fr-register.actions';

// تب‌ها
import { CitizenIdentityInfoComponent } from '../ir-tabs/citizen-identity-info/citizen-identity-info.component';
import { CitizenContactInfoComponent } from '../ir-tabs/citizen-contact-info/citizen-contact-info.component';
import { CitizenSignatureInfoComponent } from '../ir-tabs/citizen-signature-info/citizen-signature-info.component';
import { CitizenRelationsInfoComponent } from '../ir-tabs/citizen-relations-info/citizen-relations-info.component';
import { CitizenActivityInfoComponent } from '../ir-tabs/citizen-activity-info/citizen-activity-info.component';
import { CitizenEducationInfoComponent } from '../ir-tabs/citizen-education-info/citizen-education-info.component';
import { CitizenDocumentsInfoComponent } from '../ir-tabs/citizen-documents-info/citizen-documents-info.component';
import { CitizenExtraInfoComponent } from '../ir-tabs/citizen-extra-info/citizen-extra-info.component';
import { CitizenCommercialInfoComponent } from '../ir-tabs/citizen-commercial-info/citizen-commercial-info.component';
import { CitizenPassportInfoComponent } from '../ir-tabs/citizen-passport-info/citizen-passport-info.component';
import { CitizenLicenseInfoComponent } from '../ir-tabs/citizen-license-info/citizen-license-info.component';
import { CitizenConfirmationInfoComponent } from '../ir-tabs/citizen-confirmation-info/citizen-confirmation-info.component';

interface RegisterTabDef<TTabId extends string> {
    id: TTabId;
    label: string;
    icon: string;
    cmp: Type<unknown>;
    inputs?: Record<string, unknown>;
}
@Component({
    selector: 'app-register-fr-client-citizen',
    standalone: true,
    imports: [   CommonModule,
    MatTabsModule,
    MatIconModule,
    NgComponentOutlet,
    NgFor,
    NgIf,
    ButtonModule,
    ],
    templateUrl: './register-fr-client-citizen.component.html',
    styleUrl: './register-fr-client-citizen.component.scss',
})
export class RegisterFrClientCitizenComponent implements OnInit {
    @Input() InputFrCitizen;
    // تب‌های FR – بعداً اگه خواستی می‌تونی این لیست رو متفاوت از IR کنی
    tabs: RegisterTabDef<FrRegisterTabId>[] = [];

    selectedIndex = 0;

    // برای هدر بالا
    fullName = '';
    nationalCode = '';
    customerNo = '';

    constructor(
    public facade: FrRegisterFacade,
    ) {
        this.buildTabs();
    }

    ngOnInit(): void {
        // اگر clientId از route می‌گیری، اینجا مقدار بده
        this.facade.init(null);

        // تب اولیه
        this.facade.changeTab('identity');
    }

    // --- ساخت لیست تب‌ها ---
    private buildTabs(): void {
        this.tabs = [
            {
                id: 'identity',
                label: 'اطلاعات اصلی',
                icon: 'badge',
                cmp: CitizenIdentityInfoComponent,
                inputs: {
                    disabled: false,
                    onValueChange: (payload: any) =>
                        this.handleTabValueChange('identity', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('identity', valid),
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
                        this.handleTabValueChange('contact', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('contact', valid),
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
                        this.handleTabValueChange('signature', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('signature', valid),
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
                        this.handleTabValueChange('relations', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('relations', valid),
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
                        this.handleTabValueChange('industry', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('industry', valid),
                },
            },
            {
                id: 'education',
                label: 'اطلاعات تحصیلی',
                icon: 'school',
                cmp: CitizenEducationInfoComponent,
                inputs: {
                    disabled: false,
                    onValueChange: (payload: any) =>
                        this.handleTabValueChange('education', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('education', valid),
                },
            },
            {
                id: 'documents',
                label: 'مستندات',
                icon: 'folder_open',
                cmp: CitizenDocumentsInfoComponent,
                inputs: {
                    disabled: false,
                    onValueChange: (payload: any) =>
                        this.handleTabValueChange('documents', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('documents', valid),
                },
            },
            {
                id: 'extra',
                label: 'اطلاعات تکمیلی',
                icon: 'info',
                cmp: CitizenExtraInfoComponent,
                inputs: {
                    disabled: false,
                    onValueChange: (payload: any) =>
                        this.handleTabValueChange('extra', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('extra', valid),
                },
            },
            {
                id: 'business',
                label: 'اطلاعات تجاری',
                icon: 'storefront',
                cmp: CitizenCommercialInfoComponent,
                inputs: {
                    disabled: false,
                    onValueChange: (payload: any) =>
                        this.handleTabValueChange('business', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('business', valid),
                },
            },
            {
                id: 'passport',
                label: 'اطلاعات گذرنامه - تابعیت',
                icon: 'public',
                cmp: CitizenPassportInfoComponent,
                inputs: {
                    disabled: false,
                    onValueChange: (payload: any) =>
                        this.handleTabValueChange('passport', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('passport', valid),
                },
            },
            {
                id: 'license',
                label: 'اطلاعات مجوز',
                icon: 'verified',
                cmp: CitizenLicenseInfoComponent,
                inputs: {
                    disabled: false,
                    onValueChange: (payload: any) =>
                        this.handleTabValueChange('license', payload),
                    onValidityChange: (valid: boolean) =>
                        this.handleTabValidityChange('license', valid),
                },
            },

        ];
    }

    // --- event های UI ---

    onTabIndexChange(index: number): void {
        this.selectedIndex = index;
        const tab = this.tabs[index];
        if (tab) {
            this.facade.changeTab(tab.id);
        }
    }

    onCancel(): void {
        this.facade.reset();
        this.selectedIndex = 0;
        this.facade.changeTab('identity');
    }

    onSave(): void {
        this.facade.requestSave();
        // بعداً اینجا می‌تونی ناوبری یا snackbar اضافه کنی
    }

    trackById(index: number, tab: RegisterTabDef<FrRegisterTabId>): string {
        return tab.id;
    }

    // --- اتصال تب‌ها به NgRx ---

    private handleTabValueChange(tabId: FrRegisterTabId, payload: any): void {
        this.facade.setTabValue(tabId, payload ?? {});

        // اگر تب هویتی، هدر بالا رو آپدیت کن
        if (tabId === 'identity' && payload) {
            this.fullName = payload.fullName ?? this.fullName;
            this.nationalCode = payload.nationalCode ?? this.nationalCode;
            this.customerNo = payload.customerNo ?? this.customerNo;
        }
    }

    private handleTabValidityChange(tabId: FrRegisterTabId, valid: boolean): void {
        this.facade.setTabValidity(tabId, valid);
    }
}
