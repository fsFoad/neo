import { Component } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { MatTooltip } from '@angular/material/tooltip';
import { NgClass, NgIf } from '@angular/common';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { Tooltip } from 'primeng/tooltip';
import {
    RegisterClientCitizenComponent
} from '../client-citizen/register-client-citizen/register-client-citizen.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GuestClientRegisterComponent } from './guest-client-register/guest-client-register.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-client-guest',
    imports: [
        Button,
        InputText,
        ReactiveFormsModule,
        Select,
        ButtonDirective,
        MatTooltip,
        NgIf,
        PrimeTemplate,
        TableModule,
        Tooltip,
        RegisterClientCitizenComponent,
        NgClass,
        GuestClientRegisterComponent,
        DropdownModule,
    ],
    templateUrl: './client-guest.component.html',
    styleUrl: './client-guest.component.scss',
})
export class ClientGuestComponent {
    allCustomers: any[] = [];
    reasons: any[] = [];
    guestDto: any = {};
    loading = false;
    addFlag = false;
    searchPerformed = false;
    showForm = false;

    guestForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.guestForm = this.fb.group({
            nationalCode: [''],
            reason: [''],
            nationality: [''],
            branch: [''],
        });
    }

    addGuestCitizen() {
        this.addFlag = true;
        this.guestDto = {}; // مقدار پیش‌فرض برای مشتری جدید
    }

    onClose(e: boolean) {
        this.addFlag = false;
        if (e) {
            // در صورت ثبت موفق، لیست را ریفرش کن
            this.loadCustomers();
        }
    }

    loadCustomers() {
        this.loading = true;
        // در حالت واقعی باید از سرویس HTTP استفاده شود
        setTimeout(() => {
            this.allCustomers = [
                {
                    firstName: 'علی',
                    lastName: 'رضایی',
                    fatherName: 'حسن',
                    nationalId: '1234567890',
                    citizenshipType: 'ایرانی',
                    isAlive: 'فعال',
                    status: 'active',
                },
            ];
            this.loading = false;
            this.searchPerformed = true;
        }, 800);
    }

    clearForm() {
        this.guestForm.reset();
        this.allCustomers = [];
        this.searchPerformed = false;
    }
}
