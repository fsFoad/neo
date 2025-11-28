import { Injectable } from '@angular/core';
import {
    MinimalPalette,
    MinimalPreset,
    THEME_PRESETS,
    BACKGROUND_PRESETS,
    BackgroundPresetName
} from './theme-presets';
import { BehaviorSubject } from 'rxjs';
import { CARD_PRESETS } from './theme-presets';

const THEME_STORAGE_KEY = 'app_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {

    /* ----------------------------------------------------
     * 1) Reactive Theme State (Observable)
     * ---------------------------------------------------- */
    private _theme$ = new BehaviorSubject<MinimalPalette | null>(null);
    theme$ = this._theme$.asObservable();

    constructor() {
        this.loadStoredTheme();
        this.applyStoredBackground();
        this.applyStoredCardPreset();
    }

    /* ----------------------------------------------------
     * 2) ذخیره و بارگذاری از LocalStorage
     * ---------------------------------------------------- */
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

    /* ----------------------------------------------------
     * اعمال یک preset
     * ---------------------------------------------------- */
    applyPreset(presetName: keyof typeof THEME_PRESETS): void {
        const preset: MinimalPreset = THEME_PRESETS[presetName];

        if (!preset) {
            console.error(`Preset '${presetName}' یافت نشد.`);
            return;
        }

        const isDarkMode = document.body.classList.contains('dark-mode');
        const palette = isDarkMode ? preset.dark : preset.light;

        this.applyPalette(palette);

        if (preset.backgroundPreset) {
            this.setBackgroundPreset(preset.backgroundPreset);
        }

        document.documentElement.style.setProperty('--app-background', palette.background);
    }

    /* ----------------------------------------------------
     * Background Preset ها
     * ---------------------------------------------------- */
    setBackgroundPreset(name: BackgroundPresetName) {
        const isDark = document.body.classList.contains('dark-mode');
        const bg = BACKGROUND_PRESETS[name]?.[isDark ? 'dark' : 'light'] ?? '';

        document.documentElement.style.setProperty('--app-background', bg);
        localStorage.setItem('app_background', name);
    }

    applyStoredBackground() {
        const name = (localStorage.getItem('app_background') as BackgroundPresetName) ?? 'none';
        this.setBackgroundPreset(name);
    }

    /* ----------------------------------------------------
     * اعمال پالت رنگ
     * ---------------------------------------------------- */
    applyPalette(palette: MinimalPalette, store = true): void {
        this.setVar('--primary', palette.primary);
        this.setVar('--accent', palette.accent);
        this.setVar('--warn', palette.warn);

        this.setVar('--surface', palette.surface ?? '');
        this.setVar('--background', palette.background ?? '');
        this.setVar('--on-surface', palette.onSurface ?? '');


        this.setVar('--color-surface', palette.surface ?? '');
        this.setVar('--color-bg', palette.background ?? '');
        this.setVar('--color-text', palette.onSurface ?? '');
        this.setVar('--color-border', (palette.onSurface ?? '') + '33');

// Primary colors
        this.setVar('--color-primary', palette.primary);
        this.setVar('--color-primary-hover', palette.accent);

// Hover surface
        this.setVar('--color-surface-hover', (palette.surface ?? '') + '22');


        /* ---------------------------
   PrimeNG DataTable
---------------------------- */
        this.setVar('--p-datatable-row-bg', 'transparent');
        this.setVar('--p-datatable-row-color', palette.onSurface ?? '#333');

        this.setVar('--p-datatable-row-hover-bg', palette.onSurface + '0D'); /* 05-10% */
        this.setVar('--p-datatable-row-hover-color', palette.onSurface);

        this.setVar('--p-datatable-header-bg', palette.surface);
        this.setVar('--p-datatable-header-color', palette.onSurface);
        this.setVar('--p-datatable-header-border-color', (palette.onSurface ?? '') + '22');

        this.setVar('--p-datatable-border-color', (palette.onSurface ?? '') + '22');

        /* ---------------------------
           2) PrimeNG Button Mapping
        ---------------------------- */
        this.setVar('--p-button-primary-background', palette.primary);
        this.setVar('--p-button-primary-border-color', palette.primary);
        this.setVar('--p-button-primary-color', '#ffffff');
        this.setVar('--p-button-primary-hover-background', palette.accent);
        this.setVar('--p-button-primary-hover-border-color', palette.accent);
        this.setVar('--p-button-primary-hover-color', '#ffffff');

        this.setVar('--p-button-success-background', 'var(--p-green-500)');
        this.setVar('--p-button-success-border-color', 'var(--p-green-500)');
        this.setVar('--p-button-success-color', '#ffffff');

        this.setVar('--p-button-danger-background', 'var(--p-red-500)');
        this.setVar('--p-button-danger-border-color', 'var(--p-red-500)');
        this.setVar('--p-button-danger-color', '#ffffff');

        this.setVar('--p-button-success-hover-background', 'var(--p-green-600)');
        this.setVar('--p-button-danger-hover-background', 'var(--p-red-600)');

        this.setVar('--p-button-outlined-color', palette.primary);
        this.setVar('--p-button-outlined-border-color', palette.primary);
        this.setVar('--p-button-outlined-hover-background', palette.primary + '22');
        this.setVar('--p-button-outlined-hover-color', palette.primary);
        this.setVar('--p-button-outlined-active-background', palette.primary + '33');

        this.setVar('--p-button-border-radius', '0.75rem');

        this.setVar('--p-button-outlined-primary-color', palette.primary);
        this.setVar('--p-button-outlined-primary-border-color', palette.primary);
        this.setVar('--p-button-outlined-primary-hover-background', palette.primary + '22');
        this.setVar('--p-button-outlined-primary-hover-color', palette.primary);
        this.setVar('--p-button-outlined-primary-hover-border-color', palette.primary);

        /* ---------------------------
           PrimeNG Inputs
        ---------------------------- */
        this.setVar('--p-inputtext-bg', palette.surface ?? '');
        this.setVar('--p-inputtext-color', palette.onSurface ?? '');
        this.setVar('--p-inputtext-border-color', (palette.onSurface ?? '') + '33');
        this.setVar('--p-inputtext-focus-border-color', palette.primary);
        this.setVar('--p-inputtext-focus-ring-color', palette.primary + '55');
        this.setVar('--p-focus-ring-color', palette.primary + '55');
        /* ---------------------------
           PrimeNG Checkbox
        ---------------------------- */
        this.setVar('--p-checkbox-border-color', (palette.onSurface ?? '') + '55');
        this.setVar('--p-checkbox-bg', 'transparent');
        this.setVar('--p-checkbox-hover-border-color', palette.primary);
        this.setVar('--p-checkbox-checked-bg', palette.primary);
        this.setVar('--p-checkbox-checked-border-color', palette.primary);
        this.setVar('--p-checkbox-checked-icon-color', '#ffffff');

        /* ---------------------------
           PrimeNG Radio
        ---------------------------- */
        this.setVar('--p-radiobutton-border-color', (palette.onSurface ?? '') + '55');
        this.setVar('--p-radiobutton-hover-border-color', palette.primary);
        this.setVar('--p-radiobutton-checked-border-color', palette.primary);
        this.setVar('--p-radiobutton-checked-icon-color', palette.primary);

        /* ---------------------------
           PrimeNG InputSwitch (Toggle)
        ---------------------------- */
        this.setVar('--p-inputswitch-handle-bg', '#ffffff');
        this.setVar('--p-inputswitch-border-color', (palette.onSurface ?? '') + '44');
        this.setVar('--p-inputswitch-bg', (palette.onSurface ?? '') + '22');

        this.setVar('--p-inputswitch-checked-bg', palette.primary);
        this.setVar('--p-inputswitch-checked-handle-bg', '#ffffff');

        /* ---------------------------
           PrimeNG ToggleButton
        ---------------------------- */
        this.setVar('--p-togglebutton-bg', palette.surface ?? '#fff');
        this.setVar('--p-togglebutton-border-color', (palette.onSurface ?? '') + '33');
        this.setVar('--p-togglebutton-color', palette.onSurface);

        this.setVar('--p-togglebutton-checked-bg', palette.primary);
        this.setVar('--p-togglebutton-checked-border-color', palette.primary);
        this.setVar('--p-togglebutton-checked-color', '#ffffff');

        /* ---------------------------
           Material
        ---------------------------- */
        this.setVar('--mdc-theme-primary', palette.primary);
        this.setVar('--mdc-theme-on-surface', palette.onSurface ?? '');

        /* ---------------------------
           Dark mode Auto
        ---------------------------- */
        const isDark = this.isColorDark(palette.background ?? '#ffffff');
        this.toggleDarkMode(isDark);

        /* ---------------------------
           ذخیره
        ---------------------------- */
        this._theme$.next(palette);
        if (store) this.saveTheme(palette);

        const savedBg = localStorage.getItem('app_background') as BackgroundPresetName;
        if (savedBg) {
            this.setBackgroundPreset(savedBg);
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
            document.documentElement.style.setProperty('--primary-text', '#ffffff');
        } else {
            document.documentElement.style.setProperty('--primary-text', '#1f1f1f');
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
        if (hex.length < 6) return false;

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        const brightness = (r * 299 + g * 587 + b * 114) / 1000;

        return brightness < 140;
    }

    /* ----------------------------------------------------
     * Card Presets
     * ---------------------------------------------------- */
    CARD_PRESETS = CARD_PRESETS;

    setCardPreset(name: string) {
        const isDark = document.body.classList.contains('dark-mode');
        const preset = CARD_PRESETS[name]?.[isDark ? 'dark' : 'light'];

        if (!preset) return;

        this.setVar('--card-bg', preset.bg);
        this.setVar('--card-border', preset.border);
        this.setVar('--card-shadow', preset.shadow);
        this.setVar('--card-radius', preset.radius);

        localStorage.setItem('app_card_preset', name);
    }

    applyStoredCardPreset() {
        //بخش بوردر و شادو تم
        const name = localStorage.getItem('app_card_preset') ?? 'bankPaper';
        this.setCardPreset(name);
    }
}
