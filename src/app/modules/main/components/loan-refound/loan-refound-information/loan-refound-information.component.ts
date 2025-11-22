import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonDirective, ButtonModule } from 'primeng/button';

import { TableModule } from 'primeng/table';
import { Checkbox } from 'primeng/checkbox';
import { Tooltip } from 'primeng/tooltip';
import { TranslocoPipe } from '@ngneat/transloco';


@Component({
    selector: 'app-loan-refound-information',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgIf,
        InputText,
        DropdownModule,
        ButtonDirective,
        TableModule,
        ButtonModule,

    ],
    templateUrl: './loan-refound-information.component.html',
    styleUrl: './loan-refound-information.component.scss',
})
export class LoanRefoundInformationComponent implements OnInit {
    @Output() formSubmit = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();

    paymentForm!: FormGroup;
    showForm: boolean = false;
    installmentsTable = [
        {
            asl: '100,000,000',
            sood: '10,000,000',
            delay: '0',
            restFee: '5,000,000',
            buildFee: '3,000,000',
            total: '118,000,000',
            remaining: '80,000,000'
        }
    ];

    installmentTable = [
        {
            contractNumber: '1255',
            status: 'جاری',
            dueDate: '1401/01/10',
            registerDate: '1400/01/10',

            asl: '1,000,000,000',
            sood: '120,000,000',
            delay: '0',
            restFee: '15,000,000',
            buildFee: '8,000,000',

            remAsl: '900,000,000',
            remSood: '100,000,000',
            remDelay: '0',
            remRestFee: '10,000,000',
            remBuildFee: '5,000,000'
        }
    ];
    paymentBreakdownTable = [
        { title: 'اصل', paid: '', remaining: '' },
        { title: 'سود / کارمزد', paid: '', remaining: '' },
        { title: 'خسارت تأخیر', paid: '', remaining: '' },
        { title: 'سود / کارمزد دوره تنفس', paid: '', remaining: '' },
        { title: 'سود دوره ساخت', paid: '', remaining: '' },
        { title: 'جمع کل', paid: '', remaining: '' }
    ];

    discountTable = [
        { title: 'بخشش کل خسارت تأخیر در تسویه تسهیلات', amount: '' },
        { title: 'کاهش سود در تسویه قبل از سررسید', amount: '' },
        { title: 'جمع کل ماده بدهی بعد از کسر تخفیفات', amount: '' }
    ];
    paymentMethodList = [
        { label: 'ماهانه', value: 'monthly' },
        { label: 'سه‌ماهه', value: 'quarterly' },
        { label: 'سالانه', value: 'yearly' },
    ];

    ngOnInit() {
        this.paymentForm = this.fb.group({
            effectiveDate: [''],
            paymentMethod: ['', Validators.required],
            payType: ['installment', Validators.required],
            paymentAmount: ['', Validators.required],
            installmentCount: ['', Validators.required],
        });
    }

    onSubmit(): void {
        if (this.paymentForm.invalid) {
            this.paymentForm.markAllAsTouched();
            console.warn(' فرم معتبر نیست');
            return;
        }
    }

    @Input() disabled = false;

    @Output() validityChange = new EventEmitter<boolean>();
    form!: FormGroup;
    cityOptions = [
        { label: 'تهران', value: 22 },
        { label: 'مشهد', value: 51 },
    ];
    constructor(private fb: FormBuilder) {}

    onCancelClick() {
        debugger
        console.log('CANCEL FIRED');

        this.cancel.emit();
    }
    onSubmitClick() {
        this.formSubmit.emit(/* form data if needed */);
    }
    ngOnDestroy(): void {}



}
