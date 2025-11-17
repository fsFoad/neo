import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-add-new-operation',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TableModule,
        DropdownModule,
        ButtonDirective,
        InputText,
        NgIf,
        Dialog
    ],
    templateUrl: './add-new-operation.component.html',
    styleUrl: './add-new-operation.component.scss',
})
export class AddNewOperationComponent implements OnInit {
    @Input() visible = false;
    @Output() close = new EventEmitter<void>();
    @Output() confirm = new EventEmitter<any>();

    operationForm!: FormGroup;
    operationTable: any[] = [];
    detailOperationForm!: FormGroup;
    detailOperationTable: any[] = [];

    showDetailDialog = false;
    selectedOperationTitle: string = '';

    operationList = [
        { label: 'گزینه 1', value: 'option1' },
        { label: 'گزینه 2', value: 'option2' },
        { label: 'گزینه 3', value: 'option3' },
    ];

    detailList = [
        { label: 'جزء 1', value: 'detail1' },
        { label: 'جزء 2', value: 'detail2' },
        { label: 'جزء 3', value: 'detail3' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.operationForm = this.fb.group({
            contractType: [''],
            operation: [null, Validators.required],
            priority: ['', Validators.required],
        });

        this.detailOperationForm = this.fb.group({
            title: [''],
            detail: [null, Validators.required],
        });
    }

    addOperation() {
        if (this.operationForm.valid) {
            const { operation, priority } = this.operationForm.value;
            this.operationTable.push({ title: operation, priority });
        } else {
            this.operationForm.markAllAsTouched();
        }
    }

    deleteOperation(index: number) {
        this.operationTable.splice(index, 1);
    }

    showOperationDetails(row: any) {
        this.selectedOperationTitle = row.title;
        this.showDetailDialog = true;
    }

    addDetailOperation() {
        if (this.detailOperationForm.valid) {
            const { detail } = this.detailOperationForm.value;
            this.detailOperationTable.push({ detail });
            this.detailOperationForm.reset();
        }
    }

    deleteDetailOperation(index: number) {
        this.detailOperationTable.splice(index, 1);
    }

    onConfirm() {
        this.confirm.emit(this.operationTable);
    }

    onCancel() {
        this.close.emit();
    }
    operationCreate() {
        console.log('عملیات جدید ایجاد شد');
    }
}
