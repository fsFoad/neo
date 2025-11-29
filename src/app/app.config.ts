import { provideHttpClient } from '@angular/common/http';
import { APP_INITIALIZER, ApplicationConfig, inject, isDevMode } from '@angular/core';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
    PreloadAllModules,
    provideRouter,
    withInMemoryScrolling,
    withPreloading,
} from '@angular/router';
import { provideFuse } from '@fuse';
import { TranslocoService, provideTransloco } from '@ngneat/transloco';
import { appRoutes } from 'app/app.routes';
import { provideAuth } from 'app/core/auth/auth.provider';
import { provideIcons } from 'app/core/icons/icons.provider';
import { mockApiServices } from 'app/mock-api';
import { catchError, defaultIfEmpty, lastValueFrom, of } from 'rxjs';
import { TranslocoHttpLoader } from './core/transloco/transloco.http-loader';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideServiceWorker } from '@angular/service-worker';
import { provideStore } from '@ngrx/store';

// ⚠️ این دوتا رو از این فایل حذف می‌کنیم، چون توی روتر فیچری رجیستر می‌شن
// import { provideState } from '@ngrx/store';
// import { irRegisterFeature } from './modules/main/components/client-citizen/application-NgRx/ir-register/ir-register.reducer';
// import { frRegisterFeature } from './modules/main/components/client-citizen/application-NgRx/fr-register/fr-register.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000',
        }),

        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    prefix: 'p',
                    darkModeSelector: '.p-dark',
                    inputStyle: 'outlined',
                    cssLayer: false,
                },
            },
        }),

        provideAnimations(),
        provideHttpClient(),

        // 🟢 روت استور (بدون featureها)
        provideStore({}),

        // ❌ این خط کامل حذف بشه (یا اگر واقعاً effects داری از @ngrx/effects ایمپورت کن)
        // provideEffects([]),

        provideRouter(
            appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
        ),

        // Material Date Adapter
        {
            provide: DateAdapter,
            useClass: LuxonDateAdapter,
        },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'D',
                },
                display: {
                    dateInput: 'DDD',
                    monthYearLabel: 'LLL yyyy',
                    dateA11yLabel: 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                },
            },
        },

        // Transloco Config
        provideTransloco({
            config: {
                availableLangs: [
                    { id: 'en', label: 'English' },
                    { id: 'tr', label: 'Turkish' },
                    { id: 'fa', label: 'فارسی' },
                ],
                defaultLang: 'fa',
                fallbackLang: 'fa',
                reRenderOnLangChange: true,
                prodMode: true,
            },
            loader: TranslocoHttpLoader,
        }),
        {
            provide: APP_INITIALIZER,
            useFactory: () => {
                const translocoService = inject(TranslocoService);
                const defaultLang = translocoService.getDefaultLang();
                translocoService.setActiveLang(defaultLang);

                return () =>
                    lastValueFrom(
                        translocoService.load(defaultLang).pipe(
                            catchError((err) => {
                                console.error('خطا در بارگیری ترجمه:', err);
                                return of({});
                            }),
                            defaultIfEmpty({}),
                        ),
                    );
            },
            multi: true,
        },

        // Fuse
        provideAuth(),
        provideIcons(),
        provideFuse({
            mockApi: {
                delay: 0,
                services: mockApiServices,
            },
            fuse: {
                layout: 'classic',
                scheme: 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                },
                theme: 'theme-default',
                themes: [
                    { id: 'theme-default', name: 'Default' },
                    { id: 'theme-brand', name: 'Brand' },
                    { id: 'theme-teal', name: 'Teal' },
                    { id: 'theme-rose', name: 'Rose' },
                    { id: 'theme-purple', name: 'Purple' },
                    { id: 'theme-amber', name: 'Amber' },
                ],
            },
        }),

        // 🟥 این دوتا هم دیگه اینجا نباشن، چون توی route مخصوص خودشون تزریق می‌شن
        // provideState(irRegisterFeature),
        // provideState(frRegisterFeature),
    ],
};
