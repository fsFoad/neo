import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';
import { ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUpload } from 'primeng/fileupload';
import { Tooltip } from 'primeng/tooltip';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-corporate-signature-info',
    imports: [
        TranslocoPipe,
        ButtonDirective,
        TableModule,
        Dialog,
        ReactiveFormsModule,
        DropdownModule,
        FileUpload,
        Tooltip,
        NgIf,
    ],
    templateUrl: './corporate-signature-info.component.html',
    styleUrl: './corporate-signature-info.component.scss',
})
export class CorporateSignatureInfoComponent implements OnInit {
    /** اگر تب رو Readonly بخوای */
    @Input() disabled = false;

    /** کال‌بک‌های اختیاری برای ngComponentOutlet */
    @Input() onValueChange?: (val: any) => void;
    @Input() onValidityChange?: (valid: boolean) => void;

    /** خروجی‌های استاندارد */
    @Output() valueChange = new EventEmitter<any>();
    @Output() validityChange = new EventEmitter<boolean>();

    private sub = new Subscription();
    visibleSignature = false;
    // گزینه‌ها (در صورت نیاز بعداً از سرویس لود کن)
    createSignForm: FormGroup<SignatureForm> = this.fb.group<SignatureForm>({
        addressText: this.fb.control<string | null>(null, {
            validators: Validators.required,
        }),
        signatureType: this.fb.control<string | null>(null, {
            validators: Validators.required,
        }),
        hand: this.fb.control<string | null>(null, {
            validators: Validators.required,
        }),
        fingerNumber: this.fb.control<string | null>(null, {
            validators: Validators.required,
        }),
        description: [''],
        file: [null, Validators.required],
        isUploading: [false],
    });
    signatureTypeOptions = [
        { label: 'امضا (دستی)', value: 'manual' },
        { label: 'اثر انگشت', value: 'fingerprint' },
        { label: 'مهر شخصی', value: 'seal' },
        { label: 'امضای الکترونیکی', value: 'digital' },
    ];

    handOptions = [
        { label: 'دست راست', value: 'right' },
        { label: 'دست چپ', value: 'left' },
    ];

    // چون «دست» جدا انتخاب می‌شود، شماره انگشت را ۱ تا ۵ می‌گذاریم
    // با برچسب‌های فارسی رایج: شست، اشاره، میانی، انگشتری، کوچک
    fingerNumberOptions = [
        { label: '۱ - شست', value: 1 },
        { label: '۲ - اشاره', value: 2 },
        { label: '۳ - میانی', value: 3 },
        { label: '۴ - انگشتری', value: 4 },
        { label: '۵ - کوچک', value: 5 },
    ];
    uploadedFileName: string | null = null;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.buildForm();

        if (this.disabled) {
            this.signFg.disable({ emitEvent: false });
        }

        this.sub.add(
            this.signFg.valueChanges.subscribe(() => {
                const val = this.signFg.getRawValue();
                const valid = this.signFg.valid;
                this.valueChange.emit(val);
                this.validityChange.emit(valid);
                if (this.onValueChange) {
                    this.onValueChange(val);
                }
                if (this.onValidityChange) {
                    this.onValidityChange(valid);
                }
            })
        );
        this.createSignForm
            .get('signatureType')!
            .valueChanges.subscribe((v) => {
                const hand = this.createSignForm.get('hand')!;
                const fingerNumber = this.createSignForm.get('fingerNumber')!;
                if (v === 'fingerprint') {
                    hand.setValidators([Validators.required]);
                    fingerNumber.setValidators([
                        Validators.required,
                        this.fingerNumberValidator(),
                    ]);
                } else {
                    hand.clearValidators();
                    fingerNumber.clearValidators();
                }
                hand.updateValueAndValidity();
                fingerNumber.updateValueAndValidity();
            });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
    get signs(): FormArray {
        return this.signFg.get('signs') as FormArray;
    }
    fingerNumberValidator() {
        return (control: AbstractControl) => {
            const val = control.value;
            // اجازه اعداد 1..5 یا 1..10 (بسته به مدل داده شما)
            if (val == null || val === '') return null;
            const n = Number(val);
            return Number.isInteger(n) && n >= 1 && n <= 10
                ? null
                : { range: true };
        };
    }
    onFileUpload(event: any) {
        const file: File | undefined = event?.files?.[0];
        if (!file) return;
        // اعتبارسنجی ساده‌ی نوع فایل
        const okTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!okTypes.includes(file.type)) {
            this.createSignForm.get('file')!.setErrors({ type: true });
            return;
        }
        // محدودیت حجم 1MB
        if (file.size > 1024 * 1024) {
            this.createSignForm.get('file')!.setErrors({ size: true });
            return;
        }

        this.createSignForm.patchValue({ file });
        this.createSignForm.get('file')!.updateValueAndValidity();
        this.uploadedFileName = file.name;

        // اگر نیاز به آپلود واقعی به سرور داری، اینجا صدا بزن:
        // this.api.uploadSignature(file).subscribe(...)
    }
    removeAt(index: number): void {
        this.signs.removeAt(index);
    }

    isFingerprint(g: FormGroup): boolean {
        return g.get('signType')?.value === 2;
    }

    isImageSignature(g: FormGroup): boolean {
        return g.get('signType')?.value === 1;
    }

    isTextSignature(g: FormGroup): boolean {
        return g.get('signType')?.value === 3;
    }

    clearSignValue(g: FormGroup): void {
        g.get('signValue')?.setValue('');
    }

    /** انتخاب فایل (تصویر امضا/اثر انگشت) و تبدیل به Base64 */
    onFileSelected(index: number, evt: Event): void {
        const input = evt.target as HTMLInputElement;
        if (!input.files || !input.files.length) {
            return;
        }
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result as string; // data:image/...;base64,xxxx
            (this.signs.at(index) as FormGroup)
                .get('signValue')
                ?.setValue(base64);
        };
        reader.readAsDataURL(file);
    }
    contactsTable = [];
    signFg!: FormGroup;
    visibleContact = false;
    private buildForm(): void {
        this.signFg = this.fb.group({
            contacts: this.fb.array<FormGroup>([]),
            // fullName:[{ value: '', disabled: true }],
            // nationalId:[{ value: '', disabled: true }],
            // clientId:[{ value: '', disabled: true }],
        });
    }
    scanFingerprint() {
        // TODO: ادغام با SDK اسکنر؛ فعلاً یک استاب که فایل آزمایشی بسازد/تنظیم کند
        // پس از دریافت Blob/File از اسکنر:
        // const scannedFile = new File([blob], 'scan.png', { type: 'image/png' });
        // this.createSignForm.patchValue({ file: scannedFile });
        // this.uploadedFileName = scannedFile.name;
        // this.createSignForm.get('file')!.updateValueAndValidity();
    }
    // یک آیتم پیش‌فرض
    openContact() {
        this.visibleSignature = true;
    }
    closeContact() {
        this.visibleSignature = false;
    }
    submitContact() {
        // TODO: ارسال فرم
        this.closeContact();
    }
}
interface SignatureForm {
    // addressType: FormControl<SignatureForm | null>;
    // provinceId: FormControl<number | null>;

}
type SignType = 1 | 2 | 3; // 1=امضای تصویری، 2=اثر انگشت، 3=امضای دیجیتال (متنی)
type HandNo = 1 | 2;       // 1=راست، 2=چپ
type FingerNo = 1 | 2 | 3 | 4 | 5; // شست/سبابه/وسطی/حلقه/کوچک
