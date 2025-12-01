import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';

interface SelectItem {
    label: string;
    value: string;
}

@Component({
    selector: 'app-base-info-form',
    standalone: true,
    templateUrl: './base-info-form.component.html',
    styleUrls: ['./base-info-form.component.scss'],
    imports: [
        FormsModule,
        ToolbarModule,
        DropdownModule,
        InputTextModule,
        RadioButtonModule,
        ButtonModule,
        DividerModule
    ]
})
export class BaseInfoFormComponent {

    baseInfoTypes: SelectItem[] = [
        { label: 'نوع ۱', value: '1' },
        { label: 'نوع ۲', value: '2' }
    ];

    comboCodes: SelectItem[] = [
        { label: 'کد ۱', value: '1' },
        { label: 'کد ۲', value: '2' }
    ];

    form = {
        baseInfoType: '' as string | '',
        comboCode: '' as string | '',
        faTitle: '',
        enTitle: '',
        isDefault: 'no' as 'yes' | 'no',
        status: 'active' as 'active' | 'inactive',
        visibility: 'both' as 'real' | 'legal' | 'both'
    };

    onCreate() {
        // TODO: لاجیک ایجاد
        console.log('create clicked');
    }

    onActivate() {
        // TODO: لاجیک فعال کردن
        console.log('activate clicked');
    }

    onDeactivate() {
        // TODO: لاجیک غیرفعال کردن
        console.log('deactivate clicked');
    }

    onBack() {
        // TODO: برگشت
        console.log('back clicked');
    }

    onSubmit() {
        console.log('submit', this.form);
        // اینجا می‌تونی فرم رو برای API بفرستی
    }

    onCancel() {
        this.form = {
            baseInfoType: '',
            comboCode: '',
            faTitle: '',
            enTitle: '',
            isDefault: 'no',
            status: 'active',
            visibility: 'both'
        };
    }
}
