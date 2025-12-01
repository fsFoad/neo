import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroup } from 'primeng/inputgroup';
import { InputText } from 'primeng/inputtext';
import { PrimeTemplate } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-products-information',
    imports: [
        ButtonDirective,
        DropdownModule,
        InputGroup,
        InputText,
        PrimeTemplate,
        ReactiveFormsModule,
        TableModule,
    ],
    templateUrl: './products-information.component.html',
    styleUrl: './products-information.component.scss',
})
export class ProductsInformationComponent implements OnInit {
    ngOnInit() {}
    constructor() {
    }
}
