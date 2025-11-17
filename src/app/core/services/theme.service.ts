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
        const palette = isDarkMode ? preset.dark : preset.light;

        this.applyPalette(palette);
    }

    applyPalette(palette: MinimalPalette, store = true): void {

        /* ---------------------------
           1) Core Colors
        ---------------------------- */
        this.setVar('--primary', palette.primary);
        this.setVar('--accent', palette.accent);
        this.setVar('--warn', palette.warn);

        this.setVar('--surface', palette.surface);
        this.setVar('--background', palette.background);
        this.setVar('--on-surface', palette.onSurface);


        /* ---------------------------
           2) PrimeNG Button Mapping
        ---------------------------- */

        // primary
        this.setVar('--p-button-primary-background', palette.primary);
        this.setVar('--p-button-primary-border-color', palette.primary);
        this.setVar('--p-button-primary-color', '#ffffff');
        this.setVar('--p-button-primary-hover-background', palette.accent);
        this.setVar('--p-button-primary-hover-border-color', palette.accent);
        this.setVar('--p-button-primary-hover-color', '#ffffff');

        // SUCCESS (دیفالت PrimeNG)
        this.setVar('--p-button-success-background', 'var(--p-green-500)');
        this.setVar('--p-button-success-border-color', 'var(--p-green-500)');
        this.setVar('--p-button-success-color', '#ffffff');

        // DANGER (دیفالت PrimeNG)
        this.setVar('--p-button-danger-background', 'var(--p-red-500)');
        this.setVar('--p-button-danger-border-color', 'var(--p-red-500)');
        this.setVar('--p-button-danger-color', '#ffffff');

        // hover
        this.setVar('--p-button-success-hover-background', 'var(--p-green-600)');
        this.setVar('--p-button-danger-hover-background', 'var(--p-red-600)');

        /* Outlined Button Tokens */
        this.setVar('--p-button-outlined-color', palette.primary);
        this.setVar('--p-button-outlined-border-color', palette.primary);
        this.setVar('--p-button-outlined-hover-background', palette.primary + '22');
        this.setVar('--p-button-outlined-hover-color', palette.primary);
        this.setVar('--p-button-outlined-active-background', palette.primary + '33');


        this.setVar('--p-button-border-radius', '0.75rem');

// مخصوص Outlined + Severity primary
        this.setVar('--p-button-outlined-primary-color', palette.primary);
        this.setVar('--p-button-outlined-primary-border-color', palette.primary);
        this.setVar('--p-button-outlined-primary-hover-background', palette.primary + '22');
        this.setVar('--p-button-outlined-primary-hover-color', palette.primary);
        this.setVar('--p-button-outlined-primary-hover-border-color', palette.primary);
        /* ---------------------------
           3) PrimeNG Inputs
        ---------------------------- */
        this.setVar('--p-inputtext-bg', palette.surface);
        this.setVar('--p-inputtext-color', palette.onSurface);
        this.setVar('--p-inputtext-border-color', palette.onSurface + '33');
        this.setVar('--p-inputtext-focus-border-color', palette.primary);
        this.setVar('--p-inputtext-focus-ring-color', palette.primary + '55');


        /* ---------------------------
           4) PrimeNG / p-dropdown
        ---------------------------- */
        this.setVar('--p-dropdown-border-radius', '0.75rem');
        this.setVar('--p-dropdown-padding-x', '1rem');
        this.setVar('--p-dropdown-padding-y', '0.65rem');
        this.setVar('--p-dropdown-height', '42px');
        /* ---------------------------
           4) Fuse / Material
        ---------------------------- */
        this.setVar('--mdc-theme-primary', palette.primary);
        this.setVar('--mdc-theme-on-surface', palette.onSurface);


        /* ---------------------------
           5) Dark Mode Auto
        ---------------------------- */
        const isDark = this.isColorDark(palette.background);
        this.toggleDarkMode(isDark);


        /* ---------------------------
           6) Save
        ---------------------------- */
        this._theme$.next(palette);
        if (store) this.saveTheme(palette);
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
    private toggleDarkMode(isDark: boolean): void {
        const body = document.body;

        if (isDark) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
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

  /*      // وابسته‌های PrimeNG
        document.documentElement.style.setProperty('--p-primary-color', color);
        document.documentElement.style.setProperty('--p-primary-500', color);
*/
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
