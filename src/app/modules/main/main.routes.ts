import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { LoanUsageComponent } from './components/loan-usage/loan-usage.component';

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
        path: 'lon-product',loadComponent: () => import('./components/lon-product/lon-product.component')
            .then(c => c.LonProductComponent)
    },
    {
        path: 'loan-funding-sources',loadComponent: () => import('./components/loan-funding-sources/loan-funding-sources.component')
            .then(c => c.LoanFundingSourcesComponent)
    },
    {
        path: 'loan-goal',loadComponent: () => import('./components/loan-goal/loan-goal.component')
            .then(c => c.LoanGoalComponent)
    },
    {
        path: 'loan-type',loadComponent: () => import('./components/loan-type/loan-type.component')
            .then(c => c.LoanTypeComponent)
    },
    {
        path: 'loan-usage',loadComponent: () => import('./components/loan-usage/loan-usage.component')
            .then(c => c.LoanUsageComponent)
    },
    {
        path: 'loan-operation',loadComponent: () => import('./components/loan-operation/loan-operation.component')
            .then(c => c.LoanOperationComponent)
    },
    {
        path: 'loan-pattern-operation',loadComponent: () => import('./components/loan-pattern-operation/loan-pattern-operation.component')
            .then(c => c.LoanPatternOperationComponent)
    },
    {
        path: 'lon-plan-type',loadComponent: () => import('./components/lon-plan-type/lon-plan-type.component')
            .then(c => c.LonPlanTypeComponent)
    },
    {
        path: 'lon-request',loadComponent: () => import('./components/lon-request/lon-request.component')
            .then(c => c.LonRequestComponent)
    },
    {
        path: 'lon-sub-operation',loadComponent: () => import('./components/lon-sub-operation/lon-sub-operation.component')
            .then(c => c.LonSubOperationComponent)
    },

    {
        path: 'about',
        loadComponent: () => import('./components/about/about.component')
            .then(c => c.AboutComponent)
    },
] as Routes;
