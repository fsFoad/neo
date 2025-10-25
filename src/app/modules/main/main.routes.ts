import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

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
        path: 'about',
        loadComponent: () => import('./components/about/about.component')
            .then(c => c.AboutComponent)
    },
] as Routes;
