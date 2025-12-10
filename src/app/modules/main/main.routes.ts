import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { provideState } from '@ngrx/store';
import { productClientFeature } from './components/product-client-management/application-NgRx/product-client.reducer';

import { environment } from '../../../environments/environment';
import {
    ProductClientRepository
} from './components/product-client-management/domain/repositories/product-client-repository';
import { ProductClientEffects } from './components/product-client-management/application-NgRx/product-client.effects';
import { provideEffects } from '@ngrx/effects';
import { AppSettings } from '../../AppSetting';
import {
     ProductClientRepositoryMockService
} from './components/product-client-management/infrastructure/product-client-repository.mock.service';
import {
    ProductClientRepositoryHttpService
} from './components/product-client-management/infrastructure/product-client-repository.http.service';

export default [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },

    {
        path: 'lon-product',
        loadComponent: () =>
            import('./components/lon-product/lon-product.component').then(
                (c) => c.LonProductComponent
            ),
    },
    {
        path: 'loan-funding-sources',
        loadComponent: () =>
            import('./components/loan-funding-sources/loan-funding-sources.component').then(
                (c) => c.LoanFundingSourcesComponent
            ),
    },
    {
        path: 'loan-goal',
        loadComponent: () =>
            import('./components/loan-goal/loan-goal.component').then(
                (c) => c.LoanGoalComponent
            ),
    },
    {
        path: 'loan-type',
        loadComponent: () =>
            import('./components/loan-type/loan-type.component').then(
                (c) => c.LoanTypeComponent
            ),
    },
    {
        path: 'loan-usage',
        loadComponent: () =>
            import('./components/loan-usage/loan-usage.component').then(
                (c) => c.LoanUsageComponent
            ),
    },
    {
        path: 'loan-operation',
        loadComponent: () =>
            import('./components/loan-operation/loan-operation.component').then(
                (c) => c.LoanOperationComponent
            ),
    },
    {
        path: 'loan-pattern-operation',
        loadComponent: () =>
            import('./components/loan-pattern-operation/loan-pattern-operation.component').then(
                (c) => c.LoanPatternOperationComponent
            ),
    },
    {
        path: 'lon-plan-type',
        loadComponent: () =>
            import('./components/lon-plan-type/lon-plan-type.component').then(
                (c) => c.LonPlanTypeComponent
            ),
    },
    {
        path: 'lon-request',
        loadComponent: () =>
            import('./components/lon-request/lon-request.component').then(
                (c) => c.LonRequestComponent
            ),
    },
    {
        path: 'lon-sub-operation',
        loadComponent: () =>
            import('./components/lon-sub-operation/lon-sub-operation.component').then(
                (c) => c.LonSubOperationComponent
            ),
    },
    {
        path: 'client-citizen',
        loadChildren: () =>
            import('./components/client-citizen/client-citizen.routes').then(
                (m) => m.CLIENT_CITIZEN_ROUTES
            ),
    },
    {
        path: 'client-corporate',
        loadComponent: () =>
            import('./components/client-corporate/client-corporate.component').then(
                (c) => c.ClientCorporateComponent
            ),
    },
    {
        path: 'client-guest',
        loadComponent: () =>
            import('./components/client-guest/client-guest.component').then(
                (c) => c.ClientGuestComponent
            ),
    },
    {
        path: 'guest-reason',
        loadComponent: () =>
            import('./components/guest-reason-management/guest-reason-management.component').then(
                (c) => c.GuestReasonManagementComponent
            ),
    },
    {
        path: 'product-management',
        loadComponent: () =>
            import('./components/product-client-management/product-client-management.component').then(
                (c) => c.ProductClientManagementComponent
            ),
        providers: [
            provideState(productClientFeature),
            provideEffects(ProductClientEffects),
            {
                provide: ProductClientRepository,
                useClass: AppSettings.IsMock
                    ? ProductClientRepositoryMockService
                    : ProductClientRepositoryHttpService,
            },
        ],
    },

    {
        path: 'loan-contract',
        loadComponent: () =>
            import('./components/loan-contract/loan-contract.component').then(
                (c) => c.LoanContractComponent
            ),
    },
    {
        path: 'loan-contract-grant',
        loadComponent: () =>
            import('./components/loan-contract-grant/loan-contract-grant.component').then(
                (c) => c.LoanContractGrantComponent
            ),
    },
    {
        path: 'loan-involved-customer',
        loadComponent: () =>
            import('./components/loan-involved-customer/loan-involved-customer.component').then(
                (c) => c.LoanInvolvedCustomerComponent
            ),
    },
    {
        path: 'loan-proposed',
        loadComponent: () =>
            import('./components/loan-proposed/loan-proposed.component').then(
                (c) => c.LoanProposedComponent
            ),
    },
    {
        path: 'loan-refound',
        loadComponent: () =>
            import('./components/loan-refound/loan-refound.component').then(
                (c) => c.LoanRefoundComponent
            ),
    },
    {
        path: 'loan-request',
        loadComponent: () =>
            import('./components/loan-request/loan-request.component').then(
                (c) => c.LoanRequestComponent
            ),
    },
    {
        path: 'loan-settlment',
        loadComponent: () =>
            import('./components/loan-settlment/loan-settlment.component').then(
                (c) => c.LoanSettlmentComponent
            ),
    },
    {
        path: 'not-established',
        loadComponent: () =>
            import('./components/client-corporate/not-established/not-established.component').then(
                (c) => c.NotEstablishedComponent
            ),
    },
    {
        path: 'basic-info',
        loadComponent: () =>
            import('./components/base-info-form/base-info-form.component').then(
                (c) => c.BaseInfoFormComponent
            ),
    },
    {
        path: 'account-interest',
        loadComponent: () =>
            import('./components/account-interest/account-interest.component').then(
                (c) => c.AccountInterestComponent
            ),
    },

    {
        path: 'general-catalog',
        loadComponent: () =>
            import('./components/general-catalog-mng/general-catalog-mng.component').then(
                (c) => c.GeneralCatalogMngComponent
            ),
    },
    {
        path: 'media-catalog',
        loadComponent: () =>
            import('./components/media-catalog-mng/media-catalog-mng.component').then(
                (c) => c.MediaCatalogMngComponent
            ),
    },
    /*    {
        path: 'product-information-request',
        loadComponent: () =>
            import(
                './components/loan-request/product-information-request/product-information-request.component'
            ).then((c) => c.ProductInformationRequestComponent),
    },*/

    {
        path: 'about',
        loadComponent: () =>
            import('./components/about/about.component').then(
                (c) => c.AboutComponent
            ),
    },
] as Routes;
