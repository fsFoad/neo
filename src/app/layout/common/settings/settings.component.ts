import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { ThemeService } from '../../../core/services/theme.service';
import {
    FuseConfig,
    FuseConfigService,
    Scheme,
    Theme,
    Themes,
} from '@fuse/services/config';

import { Subject, takeUntil } from 'rxjs';
import { AppSettings } from '../../../AppSetting';
import { AppConfiguratorComponent } from '../primeng/configurator/app.configurator.component';
import { FormsModule } from '@angular/forms';
import { MinimalPreset } from '../../../core/services/theme-presets';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styles: [
        `
            settings {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

            @media (screen and min-width: 1280px) {
                empty-layout + settings .settings-cog {
                    left: 0 !important;
                }
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        FuseDrawerComponent,
        MatButtonModule,
        NgClass,
        MatTooltipModule,
        AppConfiguratorComponent,
        FormsModule,
        NgForOf,
        NgIf,
    ],
})
export class SettingsComponent implements OnInit, OnDestroy {
    config: FuseConfig;
    layout: string;
    scheme: 'dark' | 'light';
    theme: string;
    themes: Themes;
    presets: MinimalPreset[] = [];
    primaryColor: string = '#3f51b5';
    accentColor: string = '#ff4081';
    warnColor: string = '#f44336';
    selectedPreset: MinimalPreset | null = null; // بالای کلاس

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _themeService: ThemeService,
        private _fuseConfigService: FuseConfigService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to config changes
        this._fuseConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config: FuseConfig) => {
                // Store the config
                this.config = config;
                /*  if (config.scheme === 'dark') {
                    document.documentElement.classList.add('p-dark');
                } else {
                    document.documentElement.classList.remove('p-dark');
                }*/
                this.scheme = config.scheme === 'dark' ? 'dark' : 'light';
            });

        this.presets = this._themeService.getThemePresets();
    }
    applyPreset(preset: MinimalPreset): void {
        console.log('Clicked preset:', preset);

        // ذخیره برای استفاده بعدی (مثلاً وقتی دارک/لایت عوض شد)
        this.selectedPreset = preset;

        // تعیین حالت فعلی تم (light/dark)
        const mode: 'light' | 'dark' =
            this.scheme === 'dark' ? 'dark' : 'light';
        console.log('preset clicked', preset);
        console.log('scheme is:', this.scheme);
        const palette = preset[mode];

        this.primaryColor = palette.primary;
        this.accentColor = palette.accent;
        this.warnColor = palette.warn;

        this.applyTheme();
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    selectedColor = '#3f51b5';

    applyTheme(): void {
        this._themeService.setPalette({
            primary: this.primaryColor,
            accent: this.accentColor,
            warn: this.warnColor,
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the layout on the config
     *
     * @param layout
     */
    setLayout(layout: string): void {
        // Clear the 'layout' query param to allow layout changes
        this._router
            .navigate([], {
                queryParams: {
                    layout: null,
                },
                queryParamsHandling: 'merge',
            })
            .then(() => {
                // Set the config
                this._fuseConfigService.config = { layout };
            });
    }

    /**
     * Set the scheme on the config
     *
     * @param scheme
     */
    setScheme(scheme: Scheme): void {
        if (scheme === 'dark') {
            document.documentElement.classList.add('p-dark');
        } else {
            document.documentElement.classList.remove('p-dark');
        }
        this._fuseConfigService.config = { scheme };
    }

    /**
     * Set the theme on the config
     *
     * @param theme
     */
    setTheme(theme: Theme): void {
        this._fuseConfigService.config = { theme };
    }

    protected readonly AppSettings = AppSettings;
}
