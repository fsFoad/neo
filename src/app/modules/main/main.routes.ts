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
        path: 'about',
        loadComponent: () => import('./components/about/about.component')
            .then(c => c.AboutComponent)
    },
] as Routes;
