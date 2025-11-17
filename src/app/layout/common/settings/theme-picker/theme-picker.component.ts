import { Component, OnInit } from '@angular/core';
import { THEME_PRESETS, MinimalPreset, MinimalPresetName } from '../../../../core/services/theme-presets';
import { ThemeService } from '../../../../core/services/theme.service';
import { MatIcon } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html',
    imports: [MatIcon, NgForOf, MatIconButton],
    styleUrls: ['./theme-picker.component.scss'],
})
export class ThemePickerComponent implements OnInit {
    presets: MinimalPreset[] = [];

    selectedTheme: MinimalPresetName | null = null;

    isDarkMode = false;
    backgrounds = Object.keys((this.themeService as any).BACKGROUND_PRESETS);
    selectedBackground: string | null = localStorage.getItem('app_background') ?? null;

    constructor(public themeService: ThemeService) {}


    selectBackground(name: string) {
        this.selectedBackground = name;
        this.themeService.setBackgroundPreset(name);
        localStorage.setItem('app_background', name);
    }
    get backgroundsData() {
        return (this.themeService as any).BACKGROUND_PRESETS;
    }
    ngOnInit(): void {
        // تبدیل Record → Array
        this.presets = Object.values(THEME_PRESETS);

        // گرفتن تم انتخاب‌شده قبلی
        const saved = localStorage.getItem('selected-theme');
        if (saved && THEME_PRESETS[saved as MinimalPresetName]) {
            this.selectedTheme = saved as MinimalPresetName;
        }

        // sync mode dark/light
        this.isDarkMode = document.body.classList.contains('dark-mode');
    }

    selectTheme(name: MinimalPresetName): void {
        this.selectedTheme = name;

        // ذخیره preset انتخاب‌شده
        localStorage.setItem('selected-theme', name);

        // اعمال preset
        this.themeService.applyPreset(name);
    }

    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;

        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // اعمال preset فعلی با mode جدید
        if (this.selectedTheme) {
            this.themeService.applyPreset(this.selectedTheme);
        }
    }

    cardPresets = Object.keys((this.themeService as any).CARD_PRESETS);
    selectedCardPreset = localStorage.getItem('app_card_preset') ?? 'bankClassic';

    getCardPreview(name: string) {
        const isDark = this.isDarkMode;
        return (this.themeService as any).CARD_PRESETS[name]?.[isDark ? 'dark' : 'light'];
    }

    selectCardPreset(name: string) {
        this.selectedCardPreset = name;
        this.themeService.setCardPreset(name);
        localStorage.setItem('app_card_preset', name);
    }
}
