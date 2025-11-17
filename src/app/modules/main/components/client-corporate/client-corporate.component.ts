import {Component, OnInit} from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputGroup} from "primeng/inputgroup";
import {TableModule} from "primeng/table";
import {NgClass, NgIf} from "@angular/common";
import {Tooltip} from "primeng/tooltip";
import {InputText} from "primeng/inputtext";
import {Card} from "primeng/card";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {MatTooltip} from "@angular/material/tooltip";
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import {
    RegisterClientCitizenComponent
} from '../client-citizen/register-client-citizen/register-client-citizen.component';
import { RegisterClientCorporateComponent } from './register-client-corporate/register-client-corporate.component';



@Component({
    selector: 'app-client-corporate',
    imports: [
        ButtonDirective,
        DropdownModule,
        FormsModule,
        InputGroup,
        TableModule,
        NgIf,
        InputText,
        Tooltip,
        InputText,
        ReactiveFormsModule,
        NgClass,
        InputGroupAddon,
        Button,
        MatTooltip,
        InfiniteScrollDirective,
        RegisterClientCitizenComponent,
        RegisterClientCorporateComponent,
    ],
    standalone: true,
    templateUrl: './client-corporate.component.html',
    styleUrl: './client-corporate.component.scss',
})
export class ClientCorporateComponent implements OnInit {
    corporateDto: any;
    addFlag: boolean = false;
    isMobile: boolean = false;
    isDesktopView: boolean = false;
    easySearchFlag: boolean = true;
    currentPage = 0;
    pageSize = 5;
    allCustomers = [];
    onClose(e){
        this.addFlag=false
    }
    addCorporate(){
        this.addFlag=true
    }
    ngOnInit(): void {
        this.isDesktopView = window.innerWidth >= 768;
        this.isMobile = window.innerWidth <= 768;
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
        const selected = this.searchTypes[0];
        this.searchInputLabel = selected ? selected.label : 'مقدار جستجو';
    }
    onScrollDown() {
        debugger;
        this.currentPage++;
        this.loadNextPage();
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
        return 'جزییات نوع مشتری حقوقی';
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
    searchInputLabel: any;
    searchInputPlaceholder = '';
    searchTypes = [
        { label: 'شماره مشتری', value: 'customerId' },
        { label: 'کد ملی', value: 'nationalcode' },
    ];

    searchValue = '';
    searchPerformed = false;
    loading = false;
    customers = [
        {
            customerId: '1001',
            legalCustomerName: 'شرکت توسعه فناوری',
            nationalId: '14001234567',
            ownershipType: 'خصوصی',
            legalCustomerType: 'شرکت',
            privateCompanyType: 'سهامی خاص',
            lifeStatus: 'فعال',
            status: 'active',
        },
        {
            customerId: '1002',
            legalCustomerName: 'سازمان حمل‌ونقل عمومی',
            nationalId: '14007654321',
            ownershipType: 'دولتی',
            legalCustomerType: 'سازمان',
            privateCompanyType: '-',
            lifeStatus: 'فعال',
            status: 'active',
        },
        {
            customerId: '1003',
            legalCustomerName: 'موسسه خیریه امید',
            nationalId: '14006549872',
            ownershipType: 'عمومی غیردولتی',
            legalCustomerType: 'موسسه',
            privateCompanyType: '-',
            lifeStatus: 'منحل‌شده',
            status: 'inactive',
        },
        {
            customerId: '1004',
            legalCustomerName: 'شرکت بازرگانی پارس',
            nationalId: '14005432198',
            ownershipType: 'خصوصی',
            legalCustomerType: 'شرکت',
            privateCompanyType: 'با مسئولیت محدود',
            lifeStatus: 'فعال',
            status: 'active',
        },
        {
            customerId: '1005',
            legalCustomerName: 'انجمن فرهنگی هنری',
            nationalId: '14003322114',
            ownershipType: 'تعاونی',
            legalCustomerType: 'انجمن',
            privateCompanyType: '-',
            lifeStatus: 'فعال',
            status: 'inactive',
        },
    ];
    nationalityTypes = [
        { id: 1, label: 'ایرانی', value: 'Iranian' },
        { id: 2, label: 'افغانی', value: 'Afghan' },
        { id: 3, label: 'عراقی', value: 'Iraqi' },
        { id: 4, label: 'سوری', value: 'Syrian' },
        { id: 5, label: 'آلمانی', value: 'German' },
        { id: 6, label: 'فرانسوی', value: 'French' },
    ];
    placeOfRegistrationList = [
        { id: 1, label: 'تهران', value: 'Tehran' },
        { id: 2, label: 'مشهد', value: 'Mashhad' },
        { id: 3, label: 'اصفهان', value: 'Isfahan' },
        { id: 4, label: 'شیراز', value: 'Shiraz' },
        { id: 5, label: 'تبریز', value: 'Tabriz' },
        { id: 6, label: 'سایر', value: 'Other' },
    ];
    companyTypeList = [
        { id: 1, label: 'سهامی عام', value: 'PublicJointStock' },
        { id: 2, label: 'سهامی خاص', value: 'PrivateJointStock' },
        { id: 3, label: 'با مسئولیت محدود', value: 'LimitedLiability' },
        { id: 4, label: 'تضامنی', value: 'GeneralPartnership' },
        { id: 5, label: 'تعاونی', value: 'Cooperative' },
    ];
    legalCustomerTypeList = [
        { id: 1, label: 'شرکت', value: 'Company' },
        { id: 2, label: 'سازمان', value: 'Organization' },
        { id: 3, label: 'نهاد', value: 'Institution' },
        { id: 4, label: 'انجمن', value: 'Association' },
        { id: 5, label: 'موسسه', value: 'Foundation' },
    ];
    legalCustomerOwnershipTypeList = [
        { id: 1, label: 'خصوصی', value: 'Private' },
        { id: 2, label: 'دولتی', value: 'Governmental' },
        { id: 3, label: 'عمومی غیردولتی', value: 'PublicNonGovernmental' },
        { id: 4, label: 'تعاونی', value: 'Cooperative' },
    ];

    searchForm = this.fb.group({
        simple: this.fb.group({
            type: ['', Validators.required],
            value: ['', Validators.required],
        }),
        ownershipType: [''],
        clientType: [''],
        clientName: [''],
        companyType: [''],
        nationalityType: [''],
        nationality: [''],
        registrationNumber: [''],
        registrationPlace: [''],

        placeOfRegistration: [''],
        legalCustomerName: [''],
        legalCustomerType: [''],
        legalCustomerOwnershipType: [''],
        selectedSearchType: [''],
        searchValue: [{ value: '', disabled: !this.easySearchFlag }],
    });
    advancedVisible = false;
    constructor(private fb: FormBuilder) {}
    onSearchTypeChange(event: any) {
        const selected = this.searchTypes.find((t) => t.value === event.value);
        this.searchInputLabel = selected ? selected.label : 'مقدار جستجو';
        this.searchInputPlaceholder =
            selected.value == 'customerId'
                ? 'CUST001'
                : selected.value == 'nationalcode'
                  ? '0050650487'
                  : selected.value == 'atba'
                    ? '8912345678901'
                    : 'مقدار جستجو';
    }
    searchCustomer() {
        this.searchPerformed = true;
        // اعمال فیلتر
    }
    toggleAdvancedSearch(): void {
        this.advancedVisible = !this.advancedVisible;
        this.easySearchFlag = !this.advancedVisible;

        const ctrl = this.searchForm.get('searchValue');

        if (!this.easySearchFlag) {
            ctrl?.disable({ emitEvent: false });
        } else {
            ctrl?.enable({ emitEvent: false });
        }
    }

    onAdvancedSearch(): void {
        if (this.isAdvancedSearchValid()) {
            const params = this.searchForm.value;
            // ارسال ترکیبی فیلترها به API یا جدول
        }
    }
    onResetAdvancedSearch() {}
    isAdvancedSearchValid(): boolean {
        const form = this.searchForm.value;
        const filledFields = [
            form.ownershipType,
            form.clientType,
            form.clientName,
            form.companyType,
            form.nationalityType,
            form.registrationNumber,
            form.registrationPlace,
        ].filter((val) => val && val !== '').length;

        const registrationValid =
            !form.registrationNumber || !!form.registrationPlace;

        return filledFields >= 2 && registrationValid;
    }
}
