import { Component,Input , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Checkbox } from 'primeng/checkbox';
import { Textarea } from 'primeng/textarea';
import { InputText } from 'primeng/inputtext';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
    selector: 'app-guest-client-register',
    imports: [
        TableModule,
        ButtonDirective,
        ReactiveFormsModule,
        DropdownModule,
        Checkbox,
        Textarea,
        InputText,
        TranslocoPipe,
    ],
    templateUrl: './guest-client-register.component.html',
    styleUrl: './guest-client-register.component.scss',
})
export class GuestClientRegisterComponent implements OnInit {
    @Input() InputGuest;
    guestForm!: FormGroup;
    clients: any[] = [];

    citizenshipOptions = [
        { label: 'ایرانی', value: 'IR' },
        { label: 'اتباع خارجی', value: 'FR' },
    ];

    registerOptions = [
        { label: 'چک حضوری', value: 'presence' },
        { label: 'سیستمی', value: 'system' },
    ];

    addressTypeOptions = [
        { label: 'محل سکونت', value: 'home' },
        { label: 'محل کار', value: 'work' },
    ];

    provinceOptions = [
        { label: 'تهران', value: 'تهران' },
        { label: 'اصفهان', value: 'اصفهان' },
    ];

    cityOptions = [
        { label: 'تهران', value: 'تهران' },
        { label: 'کرج', value: 'کرج' },
    ];

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.guestForm = this.fb.group({
            citizenship: ['IR', Validators.required],
            nationalId: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            fatherName: [''],
            shahabCode: [''],
            postalCode: [''],
            registerType: ['presence'],
            amount: [''],
            region: [''],
            phone: ['', Validators.pattern('^[0-9]{11}$')],
            addressType: ['home'],
            province: ['تهران'],
            city: ['تهران'],
            addressDetail: [''],
            checkShahab: [false],
        });
    }

    onSave() {
        if (this.guestForm.valid) {
            const data = this.guestForm.value;
            this.clients.push(data);
            this.guestForm.reset({
                citizenship: 'IR',
                registerType: 'presence',
            });
        }
    }

    onEdit(client: any) {
        this.guestForm.patchValue(client);
    }

    onDelete(client: any) {
        this.clients = this.clients.filter((c) => c !== client);
    }
}
