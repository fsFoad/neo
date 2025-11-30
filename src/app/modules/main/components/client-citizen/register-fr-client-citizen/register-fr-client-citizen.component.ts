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
import { CitizenFrIdentityInfoComponent } from '../fr-tabs/citizen-fr-identity-info/citizen-fr-identity-info.component';
import { CitizenFrActivityInfoComponent } from '../fr-tabs/citizen-fr-activity-info/citizen-fr-activity-info.component';
import { CitizenFrContactInfoComponent } from '../fr-tabs/citizen-fr-contact-info/citizen-fr-contact-info.component';
import {
    CitizenFrSignatureInfoComponent
} from '../fr-tabs/citizen-fr-signature-info/citizen-fr-signature-info.component';
import {
    CitizenFrRelationsInfoComponent
} from '../fr-tabs/citizen-fr-relations-info/citizen-fr-relations-info.component';
import {
    CitizenFrDocumentsInfoComponent
} from '../fr-tabs/citizen-fr-documents-info/citizen-fr-documents-info.component';
import {
    CitizenFrEducationInfoComponent
} from '../fr-tabs/citizen-fr-education-info/citizen-fr-education-info.component';
import { CitizenFrExtraInfoComponent } from '../fr-tabs/citizen-fr-extra-info/citizen-fr-extra-info.component';
import {
    CitizenFrCommercialInfoComponent
} from '../fr-tabs/citizen-fr-commercial-info/citizen-fr-commercial-info.component';
import { CitizenFrPassportInfoComponent } from '../fr-tabs/citizen-fr-passport-info/citizen-fr-passport-info.component';
import { CitizenFrLicenseInfoComponent } from '../fr-tabs/citizen-fr-license-info/citizen-fr-license-info.component';

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
    tabs: RegisterTabDef<FrRegisterTabId>[] = [];

    selectedIndex = 0;
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
                cmp: CitizenFrIdentityInfoComponent,
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
                cmp: CitizenFrContactInfoComponent,
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
                cmp: CitizenFrSignatureInfoComponent,
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
                cmp: CitizenFrRelationsInfoComponent,
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
                cmp: CitizenFrActivityInfoComponent,
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
                cmp: CitizenFrEducationInfoComponent,
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
                cmp: CitizenFrDocumentsInfoComponent,
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
                cmp: CitizenFrExtraInfoComponent,
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
                cmp: CitizenFrCommercialInfoComponent,
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
                cmp: CitizenFrPassportInfoComponent,
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
                cmp: CitizenFrLicenseInfoComponent,
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
