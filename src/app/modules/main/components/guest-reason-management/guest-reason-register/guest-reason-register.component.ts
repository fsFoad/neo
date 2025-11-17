import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'app-guest-reason-register',
    imports: [
        NgIf,
        ReactiveFormsModule,
        InputText,
        DropdownModule,
        Checkbox,
        ButtonDirective,
    ],
    templateUrl: './guest-reason-register.component.html',
    styleUrl: './guest-reason-register.component.scss',
})
export class GuestReasonRegisterComponent {
    @Input() inputGuestReason!: FormGroup;
    @Output() close = new EventEmitter<void>();

    save() {
        console.log(this.inputGuestReason.value);
    }
    statuses = [
        { label: 'فعال', value: 'active' },
        { label: 'غیرفعال', value: 'inactive' },
    ];
    cancelForm() {
        this.close.emit();
    }
}
