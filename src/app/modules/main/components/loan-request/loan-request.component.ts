import { NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-loan-request',
    imports: [
        NgIf,
        ReactiveFormsModule,
        InputText,
        DropdownModule,
        ButtonDirective,
        InputGroup,
        TableModule,
    ],
    templateUrl: './loan-request.component.html',
    styleUrl: './loan-request.component.scss',
})
export class LoanRequestComponent implements OnInit {
   /* @Output() next = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();*/

    showForm = false;
    requestForm!: FormGroup;
    createDialogVisible = false;
    customerTypeList: [] = [];
    requestTypeList: [] = [];
    customerTable = [
        {
            customerNumber: '36911948',
            customerName: 'مهدی اکبری',
            type: 'اصلی',
        },
        {
            customerNumber: '36911998',
            customerName: 'فاطمه کامرانی',
            type: 'فرعی',
        },
    ];
    ngOnInit() {
        this.buildForms();
    }
    constructor(private fb: FormBuilder) {}
    private buildForms(): void {
        this.requestForm = this.fb.group({
            customerNationalCode: [''],
            customerType: [''],
            effectiveDate: [''],
            requestType: [''],
        });
    }
    goNext() {
      /*  this.next.emit();*/
    }

    onCancel() {

    }
}
