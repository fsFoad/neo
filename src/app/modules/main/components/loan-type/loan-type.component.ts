import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeTemplate } from 'primeng/api';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TranslocoPipe } from '@ngneat/transloco';
import { NgIf } from '@angular/common';
import { ProductCreateComponent } from '../lon-product/product-create/product-create.component';
import { Tooltip } from 'primeng/tooltip';
import { BasicInformationComponent } from './basic-information/basic-information.component';

@Component({
    selector: 'app-loan-type',
    imports: [
        ButtonDirective,
        Checkbox,
        DropdownModule,
        PrimeTemplate,
        ReactiveFormsModule,
        TableModule,
        TranslocoPipe,
        NgIf,
        ProductCreateComponent,
        Tooltip,
        BasicInformationComponent,
    ],
    templateUrl: './loan-type.component.html',
    styleUrl: './loan-type.component.scss',
})
export class LoanTypeComponent implements OnInit {
    fundingSourcesForm!: FormGroup;
    createSourceForm!: FormGroup;
    productForm!: FormGroup;
    showForm: boolean = false;
    createDialogVisible = false;

    loanGoalTable = [
        {
            contractCode: '12',
            contractTitle: 'مرابحه',
            contractGroup: 'مشارکتی',
            centralBankCode: '36',
            active: 'فعال',
        },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.fundingSourcesForm = this.fb.group({
            sourceTypeId: [null],
        });

        this.createSourceForm = this.fb.group({
            purposeCode: ['', Validators.required],
            purposeTitle: ['', Validators.required],
        });
    }

    openCreateDialog() {

        this.showForm = true;

        this.createSourceForm.reset({ active: true });
    }

    onCreateSubmit() {
        if (this.createSourceForm.valid) {
            const newSource = this.createSourceForm.value;
            newSource.active = newSource.active ? 'فعال' : 'غیرفعال';
            this.loanGoalTable.push(newSource);
            this.createDialogVisible = false;
        } else {
            this.createSourceForm.markAllAsTouched();
        }
    }

    onCancelDialog() {
        this.createDialogVisible = false;
    }

    onSourceTypeChange(event: any) {
        console.log('نوع منبع انتخاب‌شده:', event.value);
    }

    viewSource(row: any) {
        console.log('مشاهده:', row);
    }

    editSource(row: any) {
        console.log('ویرایش:', row);
    }
    onFormCancel() {
        this.showForm = false;
    }
    onFormSubmit(product: any) {
        this.showForm = false;
    }
}
