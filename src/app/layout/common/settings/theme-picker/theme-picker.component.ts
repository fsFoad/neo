import { Component, OnInit } from '@angular/core';
import {
    THEME_PRESETS,
    MinimalPreset,
    MinimalPresetName,
    BACKGROUND_PRESETS,
    BackgroundPresetName
} from '../../../../core/services/theme-presets';

import { ThemeService } from '../../../../core/services/theme.service';
import { MatIcon } from '@angular/material/icon';
import { NgForOf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { FuseConfigService } from '../../../../../@fuse/services/config';

@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html',
    styleUrls: ['./theme-picker.component.scss'],
    imports: [MatIcon, NgForOf, MatIconButton]
})
export class ThemePickerComponent implements OnInit {

    presets: MinimalPreset[] = [];

    selectedTheme: MinimalPresetName | null = null;

    isDarkMode = false;

    backgrounds: BackgroundPresetName[] = Object.keys(BACKGROUND_PRESETS) as BackgroundPresetName[];

    selectedBackground: BackgroundPresetName | null =
        (localStorage.getItem('app_background') as BackgroundPresetName) ?? null;

    constructor(
        public themeService: ThemeService,
        private fuseConfig: FuseConfigService
    ) {}
    /* ------------------------------
       انتخاب پس‌زمینه
    ------------------------------- */
    selectBackground(name: BackgroundPresetName) {
        this.selectedBackground = name;
        this.themeService.setBackgroundPreset(name);
        localStorage.setItem('app_background', name);
    }

    get backgroundsData() {
        return BACKGROUND_PRESETS;
    }

    ngOnInit(): void {
        this.presets = Object.values(THEME_PRESETS);

        const saved = localStorage.getItem('selected-theme');
        if (saved && THEME_PRESETS[saved as MinimalPresetName]) {
            this.selectedTheme = saved as MinimalPresetName;
        }

        this.isDarkMode = document.body.classList.contains('dark-mode');
    }

    /* ------------------------------
       انتخاب تم
    ------------------------------- */
    selectTheme(name: MinimalPresetName): void {
        this.selectedTheme = name;
        localStorage.setItem('selected-theme', name);
        this.themeService.applyPreset(name);
    }

    /* ------------------------------
       تغییر دارک مود
    ------------------------------- */
    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;

        /* 1) تغییر کلاس‌های دارک روی body */
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

        /* 2) تغییر scheme در Fuse */
        this.fuseConfig.config = {
            scheme: this.isDarkMode ? 'dark' : 'light'
        };

        /* 3) اعمال تم انتخاب‌شده → light/dark */
        if (this.selectedTheme) {
            this.themeService.applyPreset(this.selectedTheme);
        }

        /* 4) هماهنگی کارت → نسخه دارک/لایت */
        if (this.selectedCardPreset) {
            this.themeService.setCardPreset(this.selectedCardPreset);
        }

        /* 5) هماهنگی Background Preset */
        const savedBg = localStorage.getItem('app_background');
        if (savedBg && BACKGROUND_PRESETS[savedBg as BackgroundPresetName]) {
            this.themeService.setBackgroundPreset(savedBg as BackgroundPresetName);
        }
    }
    /* ------------------------------
       Card Presets
    ------------------------------- */
    cardPresets = Object.keys(this.themeService.CARD_PRESETS);
    selectedCardPreset = localStorage.getItem('app_card_preset') ?? 'white';

    getCardPreview(name: string) {
        const isDark = this.isDarkMode;
        return this.themeService.CARD_PRESETS[name]?.[isDark ? 'dark' : 'light'];
    }

    selectCardPreset(name: string) {
        this.selectedCardPreset = name;
        this.themeService.setCardPreset(name);
        localStorage.setItem('app_card_preset', name);
    }
}
