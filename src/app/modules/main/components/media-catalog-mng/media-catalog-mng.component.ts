import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { ButtonDirective } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputText } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-media-catalog-mng',
    imports: [
        ButtonDirective,
        Checkbox,
        PersianCalendarComponent,
        DropdownModule,
        ReactiveFormsModule,
        InputText,
        NgIf,
        Card,
    ],
    templateUrl: './media-catalog-mng.component.html',
    styleUrl: './media-catalog-mng.component.scss',
})
export class MediaCatalogMngComponent implements OnInit {
    mediaForm!: FormGroup;

    categories: SelectItem[] = [];
    languages: SelectItem[] = [];

    constructor(private fb: FormBuilder) {}
    onDeactivate() {}
    onActivate() {}
    ngOnInit(): void {
        this.initOptions();
        this.buildForm();
    }

    private initOptions(): void {
        this.categories = [
            { label: 'فیلم', value: 'movie' },
            { label: 'سریال', value: 'series' },
            { label: 'موزیک', value: 'music' },
        ];

        this.languages = [
            { label: 'انگلیسی', value: 'en' },
            { label: 'فارسی', value: 'fa' },
            { label: 'فرانسوی', value: 'fr' },
        ];
    }

    private buildForm(): void {
        this.mediaForm = this.fb.group({
            title: ['', [Validators.required, Validators.maxLength(200)]],
            description: ['', [Validators.maxLength(1000)]],
            category: [null, Validators.required],
            language: [null, Validators.required],
            publishDate: [null],
            isActive: [true],
        });
    }

    onSubmit(): void {
        if (this.mediaForm.invalid) {
            this.mediaForm.markAllAsTouched();
            return;
        }

        const payload = this.mediaForm.value;
        console.log('Media form payload:', payload);

        // اینجا کال سرویس/Api برای ذخیره
        // this.mediaService.save(payload).subscribe(...);
    }

    onReset(): void {
        this.mediaForm.reset({
            isActive: true,
        });
    }
}
