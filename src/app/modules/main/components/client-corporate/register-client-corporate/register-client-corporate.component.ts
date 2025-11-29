import { ChangeDetectorRef, Component, Input, Type } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { NgClass, NgComponentOutlet, NgForOf, NgIf } from '@angular/common';

import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CitizenReviewService } from '../../../services/citizen-review.service';/*
import { CorporateBasicInfoComponent } from '../ir-tabs/corporate-basic-info/corporate-basic-info.component';
import { CorporateContactInfoComponent } from '../ir-tabs/corporate-contact-info/corporate-contact-info.component';
import { CorporateSignatureInfoComponent } from '../ir-tabs/corporate-signature-info/corporate-signature-info.component';
import { CorporateRelationsInfoComponent } from '../ir-tabs/corporate-relations-info/corporate-relations-info.component';
import { CorporateActivityInfoComponent } from '../ir-tabs/corporate-activity-info/corporate-activity-info.component';
import { CitizenFrEducationInfoComponent } from '../../client-citizen/ir-tabs/citizen-fr-education-info/citizen-fr-education-info.component';
import { CorporateDocumentsInfoComponent } from '../ir-tabs/corporate-documents-info/corporate-documents-info.component';
import { CorporateExtraInfoComponent } from '../ir-tabs/corporate-extra-info/corporate-extra-info.component';
import { CorporateCommercialInfoComponent } from '../ir-tabs/corporate-commercial-info/corporate-commercial-info.component';
*/import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-register-client-corporate',
    imports: [
        MatIcon,
        MatTab,
        MatTabContent,
        MatTabGroup,
        MatTabLabel,
        NgComponentOutlet,
        NgForOf,
        NgIf,
        ButtonDirective,
        NgClass,
    ],
    templateUrl: './register-client-corporate.component.html',
    styleUrl: './register-client-corporate.component.scss',
    standalone: true,
})
export class RegisterClientCorporateComponent {
    @Input() InputCorporate;
    selectedIndex = 0; // مقدار اولیه
    currentClientId = 1001;
    nationalCode: any;
    customerNo: any;
    fullName: any;
    tabs=[]
 /*   tabs = [
        {
            id: 'identity',
            label: 'اطلاعات اصلی',
            icon: 'badge',
            cmp: CorporateBasicInfoComponent,
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
            cmp: CorporateContactInfoComponent,
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
            cmp: CorporateSignatureInfoComponent,
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
            cmp: CorporateRelationsInfoComponent,
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
            cmp: CorporateActivityInfoComponent,
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
            cmp: CitizenFrEducationInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('education', payload),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('education', valid),
            },
        },
        {
            id: 'docs',
            label: 'مستندات',
            icon: 'folder_open',
            cmp: CorporateDocumentsInfoComponent,
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
            cmp: CorporateExtraInfoComponent,
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
            cmp: CorporateCommercialInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('business', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('business', valid),
            },
        },
    ];*/
    constructor(
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
        private msg: MessageService,
        private reviewSvc: CitizenReviewService
    ) {}
    trackById = (_: number, t: TabDef) => t.id;
    collect(kind: string, payload: any) {
        // مثال:
        // this.aggregate = { ...this.aggregate, ...payload };
    }
    onFinalSubmit() {
        // TODO: aggregate payload from tabs (state/facade) و سرویس ثبت نهایی
        console.log('Submitting final aggregate payload...');
        // this.neobankService.saveAll(this.aggregate).subscribe(...)
    }
    setTabValidity(kind: string, valid: boolean) {
        // مثال:
        // this.tabsValidity = { ...this.tabsValidity, [kind]: valid };
    }
}
type TabDef = {
    id: string;
    label: string;
    icon: string;
    disabled?: boolean;
    cmp: Type<any> | null;
    inputs?: Record<string, any>;
};
