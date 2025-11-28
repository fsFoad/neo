import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

import { ClientCitizenComponent } from './client-citizen.component';
import { RegisterIrClientCitizen } from './register-ir-client-citizen/register-ir-client-citizen';
import { RegisterFrClientCitizenComponent } from './register-fr-client-citizen/register-fr-client-citizen.component';

import { irRegisterFeature } from './application-NgRx/ir-register/ir-register.reducer';
import { frRegisterFeature } from './application-NgRx/fr-register/fr-register.reducer';

export const CLIENT_CITIZEN_ROUTES: Routes = [
    // صفحه اصلی مدیریت مشتری حقیقی
    {
        path: '',
        component: ClientCitizenComponent,
    },

    // ثبت‌نام مشتری ایرانی
    {
        path: 'register-ir',
        component: RegisterIrClientCitizen,
        providers: [
            provideState(irRegisterFeature), // ✅ NgRx فقط برای این صفحه
        ],
    },

    // ثبت‌نام مشتری خارجی
    {
        path: 'register-fr',
        component: RegisterFrClientCitizenComponent,
        providers: [
            provideState(frRegisterFeature), // ✅ NgRx فقط برای این صفحه
        ],
    },
];
