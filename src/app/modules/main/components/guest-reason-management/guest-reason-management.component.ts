import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { TableModule } from 'primeng/table';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button, ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import {
    RegisterClientCitizenComponent
} from '../client-citizen/register-client-citizen/register-client-citizen.component';
import { GuestReasonRegisterComponent } from './guest-reason-register/guest-reason-register.component';

@Component({
    selector: 'app-guest-reason-management',
    imports: [
        NgClass,
        DropdownModule,
        Checkbox,
        TableModule,
        ReactiveFormsModule,
        ButtonDirective,
        Button,
        InputText,
        NgIf,
        RegisterClientCitizenComponent,
        GuestReasonRegisterComponent,
    ],
    templateUrl: './guest-reason-management.component.html',
    styleUrls: ['./guest-reason-management.component.scss'],
})
export class GuestReasonManagementComponent implements OnInit {
    reasonForm!: FormGroup;
    citizenDto
    reasons = [
        {
            id: 1,
            title: 'آورنده چک حضوری',
            titleEn: 'Physical Check Deliverer',
            status: 'active',
            isDefault: true,
        },
        {
            id: 2,
            title: 'آورنده چک تسهیلاتی',
            titleEn: 'Loan Check Deliverer',
            status: 'inactive',
            isDefault: false,
        },
    ];
    addFlag:boolean=false
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.reasonForm = this.fb.group({
            title: [''],
            titleEn: [''],
            status: ['active'],
            isDefault: [false],
        });
    }
    showForm: boolean = false;

    addGuestReasonCitizen() {
        this.showForm = true;
    }

    onClose(e) {
        this.showForm = false;
    }
    save() {
        console.log(this.reasonForm.value);
    }
}
