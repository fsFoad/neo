import { Component } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Card } from 'primeng/card';
import { Checkbox } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { Fieldset } from 'primeng/fieldset';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { InputText } from 'primeng/inputtext';
import { PersianCalendarComponent } from '../../../shared/components/persian-calendar/persian-calendar.module';
import { PrimeTemplate } from 'primeng/api';
import { RadioButton } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
    selector: 'app-general-catalog-mng',
    imports: [
        ButtonDirective,
        Card,
        Checkbox,
        DropdownModule,
        Fieldset,
        FormsModule,
        InputNumber,
        InputText,
        PersianCalendarComponent,
        PrimeTemplate,
        RadioButton,
        TableModule,
        ToggleSwitch,
    ],
    templateUrl: './general-catalog-mng.component.html',
    styleUrl: './general-catalog-mng.component.scss',
})
export class GeneralCatalogMngComponent {
    searchValue: string = '';
    nameValue: string = '';
    fameValue: string = '';
    selectedCategory: any = null;
    selectedStatus: any = null;
    isActive: boolean = false;
    isApproved: boolean = false;
    products: Product[] = [
        {
            id: 1,
            name: 'علی رضایی',
            fame: 'برنامه نویس',
            category: 'دسته اول',
            status: 'فعال',
            date: '۱۴۰۲/۰۳/۱۵',
        },
        {
            id: 2,
            name: 'مریم احمدی',
            fame: 'طراح',
            category: 'دسته دوم',
            status: 'غیرفعال',
            date: '۱۴۰۲/۰۴/۲۰',
        },
        {
            id: 3,
            name: 'محمد حسینی',
            fame: 'مدیر پروژه',
            category: 'دسته اول',
            status: 'فعال',
            date: '۱۴۰۲/۰۲/۱۰',
        },
        {
            id: 4,
            name: 'فاطمه محمدی',
            fame: 'تحلیلگر',
            category: 'دسته سوم',
            status: 'در انتظار',
            date: '۱۴۰۲/۰۵/۰۵',
        },
        {
            id: 5,
            name: 'رضا اکبری',
            fame: 'توسعه دهنده',
            category: 'دسته دوم',
            status: 'فعال',
            date: '۱۴۰۲/۰۱/۲۵',
        },
        {
            id: 6,
            name: 'سارا کریمی',
            fame: 'تستر نرم‌افزار',
            category: 'دسته سوم',
            status: 'فعال',
            date: '۱۴۰۲/۰۶/۱۲',
        },
    ];
    profiles: any[] = [];

    // گزینه‌های منوی کشویی دسته‌بندی
    categories = [
        { name: 'دسته اول', value: 'cat1' },
        { name: 'دسته دوم', value: 'cat2' },
        { name: 'دسته سوم', value: 'cat3' },
    ];

    // گزینه‌های منوی کشویی وضعیت
    statuses = [
        { name: 'فعال', value: 'active' },
        { name: 'غیرفعال', value: 'inactive' },
        { name: 'در انتظار', value: 'pending' },
    ];

    // آرایه‌ای از محصولات برای نمایش در جدول

    constructor() {}

    ngOnInit(): void {}

    // تابع برای جستجو
    onSearch(): void {
        console.log('جستجو با مقادیر:', {
            search: this.searchValue,
            name: this.nameValue,
            fame: this.fameValue,
            category: this.selectedCategory,
            status: this.selectedStatus,
            isActive: this.isActive,
            isApproved: this.isApproved,
        });
        // در اینجا می‌توانید منطق فیلتر کردن داده‌ها را پیاده‌سازی کنید
    }

    // تابع برای بازنشانی فرم
    onReset(): void {
        this.searchValue = '';
        this.nameValue = '';
        this.fameValue = '';
        this.selectedCategory = null;
        this.selectedStatus = null;
        this.isActive = false;
        this.isApproved = false;
    }
    addProduct() {}
    // تابع برای خروجی گرفتن از داده‌ها
    onExport(): void {
        console.log('صدور داده‌ها');
    }

    // تابع برای افزودن رکورد جدید
    onAddNew(): void {
        console.log('افزودن رکورد جدید');
    }

    profileCode = '';
    profileTitle = '';
    profileTitle2 = '';

    startDate?: Date;
    endDate?: Date;

    currencyType: string | null = null;
    currencyTypes = [
        { label: 'ریال', value: 'IRR' },
        { label: 'دلار', value: 'USD' },
        { label: 'یورو', value: 'EUR' },
    ];

    customerType: 'REAL' | 'LEGAL' | 'BOTH' = 'BOTH';
    gender: 'MALE' | 'FEMALE' | null = null;

    minOpeningAmount?: number;
    minBalance?: number;
    status = true;

    canPaymentOrder = false;
    canOnlineOpen = false;
    canSupportOthers = false;
    requireDepositAmount = false;

    minSourceAmount?: number;

    dormantMinBalance?: number;
    dormantToDormantMonths?: number;
    dormantToUnclaimedMonths?: number;
    dormantToUnpaidMonths?: number;

    onCopyCode() {
        if (navigator && navigator.clipboard) {
            navigator.clipboard.writeText(this.profileCode || '');
        }
    }
}
interface Product {
    id: number;
    name: string;
    fame: string;
    category: string;
    status: string;
    date: string;
}
