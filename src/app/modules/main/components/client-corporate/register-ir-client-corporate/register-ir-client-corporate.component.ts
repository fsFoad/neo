import { ChangeDetectorRef, Component, Input, Type } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { NgClass, NgComponentOutlet, NgForOf, NgIf } from '@angular/common';

import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CitizenReviewService } from '../../../services/citizen-review.service';/*
import { CorporateIrBasicInfoComponent } from '../ir-tabs/corporate-ir-basic-info/corporate-ir-basic-info.component';
import { CorporateIrContactInfoComponent } from '../ir-tabs/corporate-ir-contact-info/corporate-ir-contact-info.component';
import { CorporateIrSignatureInfoComponent } from '../ir-tabs/corporate-ir-signature-info/corporate-ir-signature-info.component';
import { CorporateIrRelationsInfoComponent } from '../ir-tabs/corporate-ir-relations-info/corporate-ir-relations-info.component';
import { CorporateIrActivityInfoComponent } from '../ir-tabs/corporate-ir-activity-info/corporate-ir-activity-info.component';
import { CitizenFrEducationInfoComponent } from '../../client-citizen/ir-tabs/citizen-fr-education-info/citizen-fr-education-info.component';
import { CorporateIrDocumentsInfoComponent } from '../ir-tabs/corporate-ir-documents-info/corporate-ir-documents-info.component';
import { CorporateIrExtraInfoComponent } from '../ir-tabs/corporate-ir-extra-info/corporate-ir-extra-info.component';
import { CorporateIrCommercialInfoComponent } from '../ir-tabs/corporate-ir-commercial-info/corporate-ir-commercial-info.component';
*/import { ButtonDirective } from 'primeng/button';
import {
    CorporateIrBasicInfoComponent
} from '../corporate-ir-tabs/corporate-ir-basic-info/corporate-ir-basic-info.component';
import {
    CorporateIrContactInfoComponent
} from '../corporate-ir-tabs/corporate-ir-contact-info/corporate-ir-contact-info.component';
import {
    CorporateIrActivityInfoComponent
} from '../corporate-ir-tabs/corporate-ir-activity-info/corporate-ir-activity-info.component';
import {
    CorporateIrSignatureInfoComponent
} from '../corporate-ir-tabs/corporate-ir-signature-info/corporate-ir-signature-info.component';
import {
    CorporateIrRelationsInfoComponent
} from '../corporate-ir-tabs/corporate-ir-relations-info/corporate-ir-relations-info.component';
import {
    CorporateIrDocumentsInfoComponent
} from '../corporate-ir-tabs/corporate-ir-documents-info/corporate-ir-documents-info.component';
import {
    CorporateIrExtraInfoComponent
} from '../corporate-ir-tabs/corporate-ir-extra-info/corporate-ir-extra-info.component';
import {
    CorporateIrCommercialInfoComponent
} from '../corporate-ir-tabs/corporate-ir-commercial-info/corporate-ir-commercial-info.component';
import {
    CorporateIrStampedSignedComponent
} from '../corporate-ir-tabs/corporate-ir-stamped-signed/corporate-ir-stamped-signed.component';

@Component({
    selector: 'app-register-ir-client-corporate',
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
        CorporateIrBasicInfoComponent,
        CorporateIrContactInfoComponent,
        CorporateIrActivityInfoComponent,
        CorporateIrSignatureInfoComponent,
        CorporateIrRelationsInfoComponent,
        CorporateIrDocumentsInfoComponent,
        CorporateIrExtraInfoComponent,
        CorporateIrCommercialInfoComponent,
        CorporateIrStampedSignedComponent,
    ],
    templateUrl: './register-ir-client-corporate.component.html',
    styleUrl: './register-ir-client-corporate.component.scss',
    standalone: true,
})
export class RegisterIrClientCorporateComponent {
    @Input() InputCorporate;
    selectedIndex = 0; // مقدار اولیه
    currentClientId = 1001;
    nationalCode: any;
    customerNo: any;
    fullName: any;
    tabs=[  {
        id: 'identity',
        label: 'اطلاعات اصلی',
        icon: 'badge',
        cmp: CorporateIrBasicInfoComponent,
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
            cmp: CorporateIrContactInfoComponent,
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
            cmp: CorporateIrSignatureInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('signature', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('signature', valid),
            },
        },

        {
            id: 'industry',
            label: 'زمینه فعالیت',
            icon: 'category',
            cmp: CorporateIrActivityInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('activity', payload), // ← امضای درست
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('activity', valid),
            },
        },
        {
            id: 'docs',
            label: 'مستندات',
            icon: 'folder_open',
            cmp: CorporateIrDocumentsInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('documents', payload),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('documents', valid),
            },
        },
        {
            id: 'corporate-ir-stamped-signed',
            label: 'مهر و امضاء',
            icon: 'school',
            cmp: CorporateIrStampedSignedComponent,
            inputs: {
                disabled: false,
                onValueChange: (payload: any) =>
                    this.collect('stamped-signed', payload),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('stamped-signed', valid),
            },
        },

        {
            id: 'extra',
            label: 'اطلاعات تکمیلی',
            icon: 'info',
            cmp: CorporateIrExtraInfoComponent,
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
            cmp: CorporateIrCommercialInfoComponent,
            inputs: {
                disabled: false,
                onValueChange: (val: any) => this.collect('business', val),
                onValidityChange: (valid: boolean) =>
                    this.setTabValidity('business', valid),
            },
        },



    ]
 /*   tabs = [
        {
            id: 'identity',
            label: 'اطلاعات اصلی',
            icon: 'badge',
            cmp: CorporateIrBasicInfoComponent,
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
            cmp: CorporateIrContactInfoComponent,
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
            cmp: CorporateIrSignatureInfoComponent,
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
            cmp: CorporateIrRelationsInfoComponent,
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
            cmp: CorporateIrActivityInfoComponent,
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
            cmp: CorporateIrDocumentsInfoComponent,
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
            cmp: CorporateIrExtraInfoComponent,
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
            cmp: CorporateIrCommercialInfoComponent,
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
