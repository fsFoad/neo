import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

    setPrimaryColor(color: string): void {
        // متغیر اصلی
        document.documentElement.style.setProperty('--primary', color);

        // وابسته‌های Material
        document.documentElement.style.setProperty('--mat-primary', color);
        document.documentElement.style.setProperty('--mat-accent', color);

        // وابسته‌های PrimeNG
        document.documentElement.style.setProperty('--p-primary-color', color);
        document.documentElement.style.setProperty('--p-primary-500', color);

        // وابسته‌های Fuse
        document.documentElement.style.setProperty('--fuse-primary', color);
        document.documentElement.style.setProperty('--fuse-accent', color);
    }
}
