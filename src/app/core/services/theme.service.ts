import { Injectable } from '@angular/core';
import { MinimalPalette, MinimalPreset, THEME_PRESETS } from './theme-presets';

@Injectable({ providedIn: 'root' })
export class ThemeService {


    setCssVar(name: string, value: string): void {
        document.documentElement.style.setProperty(name, value);
    }

    setPalette(palette: any): void {
        for (const key of Object.keys(palette)) {
            const css = '--' + key.replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            this.setCssVar(css, palette[key]);
        }
    }

    setPreset(preset: MinimalPreset, mode: 'light' | 'dark'): void {
        this.setPalette(preset[mode]);
    }

    getThemePresets(): MinimalPreset[] {
        return THEME_PRESETS;
    }
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
   // ===========================
    // اعمال یک preset آماده
    // ===========================

   // ===========================
    // لیست همه presetها
    // ===========================

}
