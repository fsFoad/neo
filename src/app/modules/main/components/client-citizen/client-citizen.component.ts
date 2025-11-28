import {
    NgClass,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
} from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { Button, ButtonDirective } from 'primeng/button';
import { Calendar } from 'primeng/calendar';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { IconField } from 'primeng/iconfield';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Panel } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { Toast } from 'primeng/toast';
import { Tooltip } from 'primeng/tooltip';
import { CitizenSearch } from '../../../shared/models/citizen-search.model';
import { AliveTypePipe } from '../../../shared/pipes/alive-type.pipe';
import { CitizenshipTypePipe } from '../../../shared/pipes/citizenship-type.pipe';
import { NeobankService } from '../../services/neobank.service';
import { RegisterIrClientCitizen } from './register-ir-client-citizen/register-ir-client-citizen';

@Component({
    selector: 'app-client-citizen',
    imports: [
        NgIf,
        NgForOf,
        Button,
        Tag,
        Toast,
        InputText,
        FormsModule,
        Panel,
        Calendar,
        DropdownModule,
        TableModule,
        Message,
        Tooltip,
        ButtonDirective,
        IconField,
        InputIcon,
        Dialog,
        InfiniteScrollDirective,
        InputGroup,
        InputGroupAddon,
        ReactiveFormsModule,
        NgClass,
        MatTooltip,
        CitizenshipTypePipe,
        AliveTypePipe,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        RegisterIrClientCitizen,
    ],
    templateUrl: './client-citizen.component.html',
    styleUrl: './client-citizen.component.scss',
})
export class ClientCitizenComponent {
    citizenDto: any;
    isMobile: boolean = false;
    isDesktopView: boolean = false;
    currentPage = 0;
    pageSize = 5;
    allCustomers = [];
    statusOptions = [
        { label: 'همه', value: null },
        { label: 'فعال', value: 'ACTIVE' },
        { label: 'غیرفعال', value: 'INACTIVE' },
    ];

    addFlag: boolean = false;
    searchPerformed: boolean = false;
    loading: boolean = false;
    selectedSearchType = '1';
    searchInputLabel = 'شماره مشتری';
    searchValue = '';
    advancedVisible: boolean = false;
    easySearchFlag: boolean = true;
    customers = [];
    columns = [
        { field: 'firstName', header: 'نام' },
        { field: 'lastName', header: 'نام خانوادگی' },
        { field: 'fatherName', header: 'نام پدر' },
        { field: 'nationalId', header: 'کد ملی / کد اتباع' },
        {
            field: 'citizenshipType',
            header: 'نوع تابعیت',
            pipe: 'citizenshipType',
        },
        { field: 'isAlive', header: 'وضعیت حیات', pipe: 'aliveType' },
        { field: 'status', header: 'وضعیت' },
    ];
    columnCount = this.customers.length;
    customerTypeOptions = [
        { label: 'همه', value: null },
        { label: 'حقیقی داخلی', value: 'DOMESTIC' },
        { label: 'حقیقی خارجی', value: 'FOREIGN' },
    ];

    searchTypes = [
        { label: 'شماره مشتری', value: '1' },
        { label: 'کد ملی', value: '2' },
        { label: 'کد اتباع', value: '3' },
    ];

    searchForm = this.fb.group({
        searchType: ['keyword'], // کلید واژه یا شماره مشتری
        searchValue: [''],
        nationality: [null],
        firstName: [''],
        lastName: [''],
        nationalId: [''],
        companyRegNo: [''],
    });
    nationalityOptions = [
        { label: 'ایرانی', value: 'IR' },
        { label: 'غیر ایرانی', value: 'Foreign' },
    ];

    ngOnInit(): void {
        this.isDesktopView = window.innerWidth >= 768;
        this.isMobile = window.innerWidth <= 768;
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
        const selected = this.searchTypes[0];
        this.searchInputLabel = selected ? selected.label : 'مقدار جستجو';
        this.setSearchInputMetadata(this.selectedSearchType);
    }

    onScrollDown() {
        debugger;
        this.currentPage++;
        this.loadNextPage();
    }

    onSearch() {
        console.log(this.searchForm.value);
        // اینجا درخواست به سرویس جستجو فرستاده شود
    }

    onClose(e) {}

    onReset() {
        this.searchForm.reset({ searchType: 'keyword' });
    }

    getCustomerTypeDetailLabel(clientTypeValue: any): string {
        if (clientTypeValue === 1 || clientTypeValue === 'شرکت') {
            return 'نوع شرکت';
        } else if (
            clientTypeValue === 2 ||
            clientTypeValue === 'موسسه غیرتجاری'
        ) {
            return 'نوع موسسه';
        }
        return 'جزییات نوع مشتری حقیقی';
    }

    loadNextPage() {
        debugger;
        // فرض: از سرور داده می‌گیرید یا از لیست کامل جدا می‌کنید
        const next = this.customers.slice(
            this.currentPage * this.pageSize,
            (this.currentPage + 1) * this.pageSize
        );
        this.allCustomers.push(...next);
    }

    addIRCitizen() {
        this.addFlag = true;
    }

    searchInputPlaceholder = '';
    /*    customers = [
        {
            customerId: 'علیرضا',
            ownershipType: 'کریمی',
            legalCustomerType: 'حسن',
            privateCompanyType: '0071234567',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'مریم',
            ownershipType: 'جعفری',
            legalCustomerType: 'غلامرضا',
            privateCompanyType: '0441122335',
            nationalId: 'ایرانی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'یونس',
            ownershipType: 'بهرامی',
            legalCustomerType: 'احمد',
            privateCompanyType: 'FA99001122',
            nationalId: 'اتباع خارجی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'سارا',
            ownershipType: 'رحمانی',
            legalCustomerType: 'ناصر',
            privateCompanyType: '0022334455',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'کاظم',
            ownershipType: 'صمدی',
            legalCustomerType: 'کریم',
            privateCompanyType: 'EE77889900',
            nationalId: 'اتباع خارجی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'لیلا',
            ownershipType: 'اسماعیلی',
            legalCustomerType: 'مرتضی',
            privateCompanyType: '1010234567',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'نوید',
            ownershipType: 'معتمدی',
            legalCustomerType: 'محسن',
            privateCompanyType: '1188993322',
            nationalId: 'ایرانی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'الهه',
            ownershipType: 'داوودی',
            legalCustomerType: 'اکبر',
            privateCompanyType: 'ID-887722',
            nationalId: 'اتباع خارجی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'بابک',
            ownershipType: 'موسوی',
            legalCustomerType: 'حبیب',
            privateCompanyType: '7766554433',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'نگین',
            ownershipType: 'کریمیان',
            legalCustomerType: 'رضا',
            privateCompanyType: '7788991122',
            nationalId: 'ایرانی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'ماهان',
            ownershipType: 'حسینی',
            legalCustomerType: 'اکرم',
            privateCompanyType: '1234509876',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'زهرا',
            ownershipType: 'شاکری',
            legalCustomerType: 'نادر',
            privateCompanyType: 'FA19283746',
            nationalId: 'اتباع خارجی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'پویان',
            ownershipType: 'رستمی',
            legalCustomerType: 'بهرام',
            privateCompanyType: '9900112233',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'فرزانه',
            ownershipType: 'نوری',
            legalCustomerType: 'مجتبی',
            privateCompanyType: '9988776655',
            nationalId: 'ایرانی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'سام',
            ownershipType: 'نعمتی',
            legalCustomerType: 'شهریار',
            privateCompanyType: 'ID-332211',
            nationalId: 'اتباع خارجی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'بهناز',
            ownershipType: 'افتخاری',
            legalCustomerType: 'کامران',
            privateCompanyType: '6677889900',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'کاوه',
            ownershipType: 'ذبیحی',
            legalCustomerType: 'منصور',
            privateCompanyType: 'AA44556677',
            nationalId: 'اتباع خارجی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'نسترن',
            ownershipType: 'شجاعی',
            legalCustomerType: 'حمید',
            privateCompanyType: '4455667788',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
        {
            customerId: 'شایان',
            ownershipType: 'حاجی‌زاده',
            legalCustomerType: 'سهراب',
            privateCompanyType: 'ID-55667788',
            nationalId: 'اتباع خارجی',
            lifeSituation: 'درگذشته',
            status: 'inactive',
        },
        {
            customerId: 'ریحانه',
            ownershipType: 'فراهانی',
            legalCustomerType: 'یدالله',
            privateCompanyType: '3344556677',
            nationalId: 'ایرانی',
            lifeSituation: 'زنده',
            status: 'active',
        },
    ];*/

    ownershipTypes = [
        { id: 1, label: 'شخص حقیقی', value: 'Individual' },
        { id: 2, label: 'شخص حقیقی', value: 'Legal Entity' },
        { id: 3, label: 'دولتی', value: 'Governmental' },
        { id: 4, label: 'شرکت تابعه', value: 'Subsidiary' },
        { id: 5, label: 'مشارکتی', value: 'Partnership' },
    ];
    clientTypes = [
        { id: 1, label: 'مشتری حقیقی', value: 'Retail Customer' },
        { id: 2, label: 'مشتری حقیقی', value: 'Corporate Customer' },
        { id: 3, label: 'مشتری VIP', value: 'VIP Customer' },
        { id: 4, label: 'مشتری ویژه', value: 'Special Client' },
        { id: 5, label: 'مشتری خارجی', value: 'Foreign Customer' },
    ];
    nationalityTypes = [
        { id: 1, label: 'ایرانی', value: 'Iranian' },
        { id: 2, label: 'افغانی', value: 'Afghan' },
        { id: 3, label: 'عراقی', value: 'Iraqi' },
        { id: 4, label: 'سوری', value: 'Syrian' },
        { id: 5, label: 'آلمانی', value: 'German' },
        { id: 6, label: 'فرانسوی', value: 'French' },
    ];
    registrationPlaces = [
        { id: 1, label: 'تهران', value: 'Tehran' },
        { id: 2, label: 'شیراز', value: 'Shiraz' },
        { id: 3, label: 'اصفهان', value: 'Isfahan' },
        { id: 4, label: 'مشهد', value: 'Mashhad' },
        { id: 5, label: 'تبریز', value: 'Tabriz' },
        { id: 6, label: 'منطقه آزاد کیش', value: 'Kish Free Zone' },
        { id: 7, label: 'منطقه آزاد انزلی', value: 'Anzali Free Zone' },
    ];
    companyTypes = [
        { id: 1, label: 'سهامی خاص', value: 'Private Joint Stock' },
        { id: 2, label: 'سهامی عام', value: 'Public Joint Stock' },
        { id: 3, label: 'مسئولیت محدود', value: 'Limited Liability Company' },
        { id: 4, label: 'تضامنی', value: 'General Partnership' },
        { id: 5, label: 'تعاونی', value: 'Cooperative Company' },
        { id: 6, label: 'دولتی', value: 'Government-Owned Company' },
    ];

    citizenshipOptions = [
        { label: 'ایرانی', value: 'iranian' },
        { label: 'اتباع خارجی', value: 'foreigner' },
    ];

    ownershipOptions = [
        { label: 'خصوصی', value: 'private' },
        { label: 'دولتی', value: 'government' },
        { label: 'نیمه‌دولتی', value: 'semi-government' },
        { label: 'عمومی غیردولتی', value: 'ngo' },
    ];

    legalCustomerTypeOptions = [
        { label: 'شرکت تجاری', value: 'commercial' },
        { label: 'مؤسسه غیرتجاری', value: 'non-commercial' },
        { label: 'نهاد عمومی', value: 'public-entity' },
        { label: 'سایر', value: 'other' },
    ];

    companyTypeOptions = [
        { label: 'مسئولیت محدود', value: 'llc' },
        { label: 'سهامی خاص', value: 'private-joint-stock' },
        { label: 'سهامی عام', value: 'public-joint-stock' },
        { label: 'تعاونی', value: 'cooperative' },
        { label: 'سایر', value: 'other' },
    ];

    registrationPlaceOptions = [
        { label: 'تهران', value: 'tehran' },
        { label: 'مشهد', value: 'mashhad' },
        { label: 'اصفهان', value: 'isfahan' },
        { label: 'تبریز', value: 'tabriz' },
        { label: 'سایر', value: 'other' },
    ];

    constructor(
        private fb: FormBuilder,
        private neobankService: NeobankService
    ) {}

    clearSearch() {
        this.searchValue = '';
        this.searchPerformed = false;
    }

    onSearchTypeChange(event: any): void {
        this.selectedSearchType = event.value;
        this.setSearchInputMetadata(this.selectedSearchType);
    }

    setSearchInputMetadata(type: string): void {
        const typeMeta = this.searchTypes.find((t) => t.value === type);
        this.searchInputLabel = typeMeta?.label || 'اطلاعات را وارد کنید';
        this.searchInputPlaceholder =
            type === 'customerId'
                ? 'CUST001'
                : type === 'nationalcode'
                  ? '0050650487'
                  : type === 'atba'
                    ? '8912345678901'
                    : 'اطلاعات را وارد کنید';
    }

    searchCustomer(): void {
        debugger;
        this.searchPerformed = true;
        this.onSimpleSearch();
    }

    toggleAdvancedSearch(): void {
        this.advancedVisible = !this.advancedVisible;
        this.easySearchFlag = !this.advancedVisible;
    }

    onSimpleSearch(): void {
        /*  const simpleGroup = this.searchForm.get('simple');*/
        debugger;
        let searchTypes = Number(this.selectedSearchType);
        let searchValue = Number(this.searchValue);
        this.neobankService
            .easyretrieveclientcitizen(searchTypes, searchValue)
            .subscribe((res) => {
                debugger;
                console.log('x', res);
                this.customers = [];
                Array.isArray(res.result)
                    ? (this.customers = res.result)
                    : this.customers.push(res.result);
                console.log('this.customers', this.customers);
            });
        /*  if (simpleGroup?.valid) {
            const { type, value } = simpleGroup.value;
            console.log('جستجوی ساده با', { type, value });
            // TODO: فراخوانی سرویس یا فیلتر داده‌ها
        }*/
    }

    onAdvancedSearch(): void {
        if (!this.searchForm.valid) {
            return;
        }
        const formValue = this.searchForm.value;
        const citizenshipType = formValue.nationality;
        if (!citizenshipType) {
            return;
        }
        const objCitizenSearch: CitizenSearch = {
            citizenshipType: citizenshipType,
            ...(formValue.firstName && { firstName: formValue.firstName }),
            ...(formValue.lastName && { lastName: formValue.lastName }),
            ...(formValue.nationalId && {
                registrationNumber: Number(formValue.nationalId),
            }),
            ...(formValue.companyRegNo && {
                immigrationNumber: formValue.companyRegNo,
            }),
        };

        this.neobankService.advanceretrieveclient(objCitizenSearch).subscribe({
            next: (res) => {
                this.searchPerformed = true;
                this.customers = [];
                if (Array.isArray(res.result)) {
                    this.customers = res.result;
                } else if (res.result) {
                    this.customers.push(res.result);
                }
                console.log('نتایج جستجوی پیشرفته:', this.customers);
                this.customers = Array.isArray(res.result)
                    ? res.result
                    : [res.result];
            },
            error: (err) => {
                console.error('خطا در دریافت اطلاعات:', err);
            },
        });
    }

    isAdvancedSearchValid(): boolean {
        return true;
    }

    onResetAdvancedSearch(): void {
        this.searchForm.patchValue({
            nationalId: '',
            searchType: null, // کلید واژه یا شماره مشتری
            searchValue: null,
            nationality: null,
            firstName: null,
            lastName: null,
            companyRegNo: null,
        });
        this.customers = [];
    }
}
