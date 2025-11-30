import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-corporate-ir-stamped-signed',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        ButtonModule,
        CardModule
    ],
  templateUrl: './corporate-ir-stamped-signed.component.html',
  styleUrl: './corporate-ir-stamped-signed.component.scss'
})
export class CorporateIrStampedSignedComponent {
    form: FormGroup;

    publicBudgetOptions: YesNoOption[] = [
        { label: 'ندارد', value: 'no' },
        { label: 'دارد', value: 'yes' }
    ];

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            shortName: [''],
            latinShortName: [''],

            officialGazettePageNo: [''],
            officialGazetteDate: [null],

            establishmentDate: [null],
            establishmentLicenseNo: [''],

            startWorkDate: [null],
            officialAdDate: [null],

            representativeSignature: [''],
            publicBudgetUsage: ['no']
        });
    }

    onSubmit(): void {
        if (this.form.valid) {
            console.log('FORM VALUE', this.form.value);
            // اینجا می‌تونی ارسال به API رو انجام بدی
        }
    }

    onReset(): void {
        this.form.reset({ publicBudgetUsage: 'no' });
    }

}
interface YesNoOption {
    label: string;
    value: 'yes' | 'no';
}
