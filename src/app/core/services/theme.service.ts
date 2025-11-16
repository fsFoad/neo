import { Injectable } from '@angular/core';
import { MinimalPalette, MinimalPreset, THEME_PRESETS } from './theme-presets';

@Injectable({ providedIn: 'root' })
export class ThemeService {


    setCssVar(name: string, value: string): void {
        document.documentElement.style.setProperty(name, value);
    }

    setPalette(colors: { primary: string; accent: string; warn: string }) {
        const isDark = this.isColorDark(colors.primary);

        document.documentElement.style.setProperty('--primary', colors.primary);
        document.documentElement.style.setProperty('--accent', colors.accent);
        document.documentElement.style.setProperty('--warn', colors.warn);

        if (isDark) {
            document.documentElement.style.setProperty('--primary-text', '#ffffff');   // متن سفید
        } else {
            document.documentElement.style.setProperty('--primary-text', '#1f1f1f');   // متن تیره
        }
    }

    setPreset(preset: MinimalPreset, mode: 'light' | 'dark'): void {
        this.setPalette(preset[mode]);
    }

    getThemePresets(): MinimalPreset[] {
        return THEME_PRESETS;
    }
    isColorDark(hex: string): boolean {
        hex = hex.replace('#', '');

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Relative luminance formula
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness < 140;
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
