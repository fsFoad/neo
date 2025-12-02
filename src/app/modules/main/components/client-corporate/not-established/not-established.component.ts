import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableLazyLoadEvent } from 'primeng/table';

import { Panel } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Button, ButtonDirective } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { NgIf } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { Tooltip } from 'primeng/tooltip';


interface SelectOption {
    label: string;
    value: string;
}

@Component({
    selector: 'app-not-established',
    standalone: true,
    imports: [
        Panel,
        FormsModule,
        InputText,
        DropdownModule,
        ButtonDirective,
        TableModule,
        Button,
        NgIf,
        ReactiveFormsModule,
        MatTooltip,
        Tooltip,
    ],
    templateUrl: './not-established.component.html',
})
export class NotEstablishedComponent implements OnInit {
    // فیلترها
    filters = {
        accountNo: '',
        nationality: null as string | null,
        ownerType: null as string | null,
        legalType: null as string | null,
        customerName: '',
    };

    nationalities = [
        { label: 'ایرانی', value: 'IR' },
        { label: 'غیرایرانی', value: 'NON_IR' },
    ];

    ownerTypes = [
        { label: 'خصوصی', value: 'PRIVATE' },
        { label: 'دولتی', value: 'GOV' },
    ];

    legalTypes = [
        { label: 'شرکت', value: 'COMPANY' },
        { label: 'مؤسسه', value: 'INSTITUTE' },
    ];

    customers: NotEstablishedCustomer[] = [];
    totalRecords = 0;
    pageSize = 5;
    currentPage = 0;

    constructor() {}
    onLazyLoad(event: TableLazyLoadEvent): void {
        const page = (event.first ?? 0) / (event.rows ?? this.pageSize);
        const size = event.rows ?? this.pageSize;

        this.currentPage = page;
        this.pageSize = size;

        // اینجا API را صدا بزن
        console.log('lazy load', page, size, event);
    }
    ngOnInit(): void {
        // اولیه (نمونه‌داده)
        this.customers = [
            {
                id: 1,
                accountNo: '480-0054',
                ownerType: 'خصوصی',
                legalType: 'شرکت',
                name: 'شرکت نما سازان عصر',
            },
            {
                id: 2,
                accountNo: '480-3451',
                ownerType: 'خصوصی',
                legalType: 'شرکت',
                name: 'شرکت تست ۲',
            },
            {
                id: 3,
                accountNo: '480-4359',
                ownerType: 'خصوصی',
                legalType: 'شرکت',
                name: 'شرکت تست ۳',
            },
        ];
        this.totalRecords = this.customers.length;
    }

    onSearch(): void {
        // اینجا به APIت وصل شو و با توجه به filters سرچ کن
        console.log('search with filters', this.filters);
    }

    onReset(): void {
        this.filters = {
            accountNo: '',
            nationality: null,
            ownerType: null,
            legalType: null,
            customerName: '',
        };
        this.onSearch();
    }
    /*

    onLazyLoad(event: LazyLoadEvent): void {
        const page = (event.first ?? 0) / (event.rows ?? this.pageSize);
        const size = event.rows ?? this.pageSize;
        this.currentPage = page;
        this.pageSize = size;

        // TODO: فراخوانی سرویس با page و size و filters
        console.log('lazy load', page, size);
    }
*/
    onResetAdvancedSearch() {}
    onAdvancedSearch() {}
    onCreate(): void {
        console.log('create');
    }
    addNotStablished() {}
    onPrint(): void {
        console.log('print');
    }

    onExportExcel(): void {
        console.log('export to excel');
    }

    onView(row: NotEstablishedCustomer): void {
        console.log('view', row);
    }

    onApprove(row: NotEstablishedCustomer): void {
        console.log('approve', row);
    }

    onSendSms(row: NotEstablishedCustomer): void {
        console.log('send sms', row);
    }
}
interface NotEstablishedCustomer {
    id: number;
    accountNo: string;
    ownerType: string;
    legalType: string;
    name: string;
}
