import {
    Component,
    ElementRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ThemeService } from 'app/core/services/theme.service';
import { THEME_PRESETS } from 'app/core/services/theme-presets';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';

@Component({
    selector: 'theme-switcher',
    templateUrl: './theme-switcher.component.html',
    imports: [MatIcon, MatIconButton, NgForOf],
})
export class ThemeSwitcherComponent {
    @ViewChild('themePanel') private _themePanel!: any;
    @ViewChild('themeOrigin', { read: ElementRef })
    private _themeOrigin!: ElementRef;

    private _overlayRef!: OverlayRef;

    presetList = Object.values(THEME_PRESETS);

    constructor(
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _themeService: ThemeService
    ) {}

    openPanel(): void {
        if (!this._overlayRef) {
            this._createOverlay();
        }

        this._overlayRef.attach(
            new TemplatePortal(this._themePanel, this._viewContainerRef)
        );
    }

    private _createOverlay(): void {
        const positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this._themeOrigin)
            .withFlexibleDimensions(false)
            .withPush(false)
            .withPositions([
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                },
            ]);

        this._overlayRef = this._overlay.create({
            hasBackdrop: true,
            backdropClass: 'fuse-backdrop',
            panelClass: 'fuse-theme-panel',
            scrollStrategy: this._overlay.scrollStrategies.block(),
            positionStrategy,
        });

        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    selectTheme(name: string): void {
        this._themeService.applyPreset(name as any);
        this._overlayRef.detach();
    }
}
