import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonDirective } from 'primeng/button';
import { NgIf } from '@angular/common';
import { AddNewOperationComponent } from './add-new-operation/add-new-operation.component';

@Component({
    selector: 'app-loan-pattern-operation',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TableModule,
        ButtonDirective,
        NgIf,
        AddNewOperationComponent,
    ],
    templateUrl: './loan-pattern-operation.component.html',
    styleUrl: './loan-pattern-operation.component.scss',
})
export class LoanPatternOperationComponent implements OnInit {
    showChild = false;
    operationTable = [{ type: 'مرابحه' }];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {}

    openCreateDialog() {
        this.showChild = true;
    }

    closeChild() {
        this.showChild = false;
    }

    confirmChild(data: any) {
        console.log('داده‌های دریافتی از فرزند:', data);
        this.showChild = false;
    }
}
