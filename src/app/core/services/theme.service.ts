import { Injectable } from '@angular/core';
import { MinimalPalette, MinimalPreset, THEME_PRESETS } from './theme-presets';
import { BehaviorSubject } from 'rxjs';
const THEME_STORAGE_KEY = 'app_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    // ----------------------------------------------------
    // 1) Reactive Theme State (Observable)
    // ----------------------------------------------------
    private _theme$ = new BehaviorSubject<MinimalPalette | null>(null);
    theme$ = this._theme$.asObservable();
    constructor() {
        this.loadStoredTheme();
    }
    // ----------------------------------------------------
    // 2) ذخیره و بارگذاری از LocalStorage
    // ----------------------------------------------------
    private loadStoredTheme(): void {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored) {
            const palette = JSON.parse(stored) as MinimalPalette;
            this.applyPalette(palette, false);
        }
    }
    saveTheme(palette: MinimalPalette): void {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(palette));
    }
    setVar(name: string, value: string): void {
        document.documentElement.style.setProperty(name, value);
    }
    // ----------------------------------------------------
    applyPreset(presetName: keyof typeof THEME_PRESETS): void {
        const preset: MinimalPreset = THEME_PRESETS[presetName];

        if (!preset) {
            console.error(`Preset '${presetName}' یافت نشد.`);
            return;
        }

        const isDarkMode = document.body.classList.contains('dark-mode');

        this.applyPalette(isDarkMode ? preset.dark : preset.light);
    }

    private toggleDarkMode(isDark: boolean): void {
        const body = document.body;
        if (isDark) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }
    applyPalette(palette: MinimalPalette, store = true): void {
        // Primary / Accent / Warn
        this.setVar('--primary', palette.primary);
        this.setVar('--accent', palette.accent);
        this.setVar('--warn', palette.warn);

        // Fuse mapping
        this.setVar('--fuse-primary', palette.primary);
        this.setVar('--fuse-accent', palette.accent);

        // تشخیص حالت Dark / Light
        const isDark = this.isColorDark(palette.primary);
        this.toggleDarkMode(isDark);

        // انتشار به تمامی Subscriberها
        this._theme$.next(palette);

        // ذخیره
        if (store) {
            this.saveTheme(palette);
        }
    }

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
        return Object.values(THEME_PRESETS);
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
